import { get } from "svelte/store";
import { ethereumAccount } from "../store/account";
import { activeRiddle, activeRiddleIndex, isLoadingRiddles, minDepositAmount, riddles, riddleStructure } from "../store/riddles";
import { calculatePayout } from "./calculatePayout";
import checkChainForSepolia from "./checkChainForSepolia";
import getRiddlesFromContract from "./getRiddlesFromcontract";
import { setAlert } from "./setAlert";

async function getRandomRiddle(guess) {
    //if ethereum is not available, return
    if (!(window as any).ethereum) {
        return;
    }
    //if ethereum account is not available, return
    const ethereumAccountStore = get(ethereumAccount);
    if (!ethereumAccountStore) {
        
        return;
    }
    //chain is not sepolia,set alert, return
    if ((await checkChainForSepolia()) === false) {
        setAlert("error", "Please switch to Sepolia");
        return;
    }
    
    getRiddlesFromContract();
    const riddlesStore = get(riddles);
    guess = [];
    var guessString = "";
    if (riddlesStore && riddlesStore.length) {
        isLoadingRiddles.set(false);
        const unsolvedRiddles = riddlesStore.filter(
            (obj) => obj.isSolved === false
        );
        activeRiddleIndex.set(
            Math.floor(Math.random() * unsolvedRiddles.length)
        );
        const activeRiddleIndexStore = get(activeRiddleIndex);
        if (
            unsolvedRiddles.length &&
            unsolvedRiddles[activeRiddleIndexStore].isSolved === false
        ) {
            activeRiddle.set(unsolvedRiddles[activeRiddleIndexStore]);
            const activeRiddleStore = get(activeRiddle);
            const minDepositAmountStore = get(minDepositAmount);
            calculatePayout(activeRiddleStore, minDepositAmountStore);
            let riddleStructureArray = [];
            for (let i = 0; i < activeRiddleStore.answerStructure.length; i++) {
                riddleStructureArray.push(activeRiddleStore.answerStructure[i]);
            }
            riddleStructure.set(riddleStructureArray);
        }
    } else {
        console.log("no riddles found")
    }
}

export default getRandomRiddle;