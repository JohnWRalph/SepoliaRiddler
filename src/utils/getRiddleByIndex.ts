import { Contract, ethers } from "ethers";
import { get } from "svelte/store";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import { hasMetamask } from "../store/account";
import { activeRiddle, activeRiddleIndex, minDepositAmount, riddleStructure } from "../store/riddles";
import { calculatePayout } from "./calculatePayout";
import { setAlert } from "./setAlert";

async function getRiddleByIndex(index,guess) {
    guess = [];
    var guessString = "";
    let provider;
    console.log("index", index);
    const hasMetamaskStore = get(hasMetamask);
    if (hasMetamaskStore) {
        provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        const newContract = new Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            RIDDLER_ABI,
            provider.getSigner()
        );
        let riddle;
        try {
            riddle = await newContract.getRiddleByIndex(index);
        } catch (error) {
            console.log(error);
            setAlert("error", "Not a valid Riddle ID");
            return;
        }
        activeRiddle.set(riddle);
        activeRiddleIndex.set(index);
        const activeRiddleStore = get(activeRiddle);
        const minDepositAmountStore = get(minDepositAmount);
        calculatePayout(activeRiddleStore, minDepositAmountStore);
        console.log(activeRiddleStore.answerStructure);
        let riddleStructureArray = [];
        // console.log($activeRiddle.answerStructure.length);
        for (let i = 0; i < activeRiddleStore.answerStructure.length; i++) {
            riddleStructureArray.push(activeRiddleStore.answerStructure[i]);
        }
        console.log(riddleStructureArray);
        riddleStructure.set(riddleStructureArray);
        // console.log($riddleStructure);
        setTimeout(() => {
            try {
                var button = document.getElementById(
                    "submitGuessButton"
                ) as HTMLButtonElement;
                if (activeRiddleStore.isSolved === true) {
                    button.disabled = true;
                    button.innerHTML = "Riddle Solved";
                    button.classList.add("btn-disabled");
                } else {
                    button.disabled = false;
                    button.innerHTML = "Submit Answer";
                    button.classList.remove("btn-disabled");
                }
            } catch (error) {
                console.log(error);
            }
        }, 100);
    } else {
        return;
        // provider = new ethers.providers.JsonRpcProvider(
        //     import.meta.env.VITE_API_KEY
        // );
        // const newContract = new Contract(
        //     import.meta.env.VITE_CONTRACT_ADDRESS,
        //     RIDDLER_ABI,
        //     provider
        // );

        // let riddle;
        // try {
        //     riddle = await newContract.getRiddleByIndex(riddleIndex);
        // } catch (error) {
        //     console.log(error);
        //     setAlert("error", "Not a valid Riddle ID");
        //     return;
        // }
        // activeRiddle.set(riddle);
        // activeRiddleIndex.set(index);
        // console.log($activeRiddle);
        // calculatePayout($activeRiddle, $minDepositAmount);
        // console.log($activeRiddle.answerStructure);
        // let riddleStructureArray = [];
        // console.log($activeRiddle.answerStructure.length);
        // for (let i = 0; i < $activeRiddle.answerStructure.length; i++) {
        //     riddleStructureArray.push($activeRiddle.Structure[i]);
        // }
        // console.log(riddleStructureArray);
        // riddleStructure.set(riddleStructureArray);
        // console.log($riddleStructure);
        // setTimeout(() => {
        //     try {
        //         button = document.getElementById(
        //             "submitGuessButton"
        //         ) as HTMLButtonElement;
        //         if ($activeRiddle.isSolved === true) {
        //             button.disabled = true;
        //             button.innerHTML = "Riddle Solved";
        //             button.classList.add("btn-disabled");
        //         } else {
        //             button.disabled = false;
        //             button.innerHTML = "Submit Answer";
        //             button.classList.remove("btn-disabled");
        //         }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }, 100);
    }
}

export default getRiddleByIndex;