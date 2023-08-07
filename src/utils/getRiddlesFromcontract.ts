import { Contract, ethers } from "ethers";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import { activeRiddle, isLoadingRiddles, minDepositAmount, riddles, solvedRiddles, unsolvedRiddles } from "../store/riddles";
import checkChainForSepolia from "./checkChainForSepolia";
import getsolvedRiddles from "./getSolvedRiddles";
import { get } from 'svelte/store';
async function getRiddlesFromContract() {
    let provider;

    if ((window as any).ethereum && (await checkChainForSepolia()) === true) {
        provider = new ethers.providers.Web3Provider((window as any).ethereum);
        isLoadingRiddles.set(true);
    } else {
        return;
    }
    const newContract = new Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        RIDDLER_ABI,
        provider
    );
    try {
        const allriddles = await newContract.getRiddles();
        riddles.set(allriddles);
        const minDepositAmountBN = await newContract.getMinDepositAmount();
        const minDepositAmountNumber = minDepositAmountBN.toNumber();
        minDepositAmount.set(minDepositAmountNumber);
        var solvedRiddlesSet = await getsolvedRiddles(newContract);
        solvedRiddles.set(solvedRiddlesSet);
        const riddlesStore = get(riddles);
        unsolvedRiddles.set(riddlesStore.filter((obj) => obj.isSolved === false));
    } catch (error) {
        console.log(error);
        activeRiddle.set(null);
    }
    isLoadingRiddles.set(false);
}

export default getRiddlesFromContract;