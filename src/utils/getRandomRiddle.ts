import { get } from "svelte/store";
import { activeRiddle, activeRiddleIndex, isLoadingRiddles, minDepositAmount, riddles, riddleStructure } from "../store/riddles";
import { calculatePayout } from "./calculatePayout";
import getRiddlesFromContract from "./getRiddlesFromcontract";

async function getRandomRiddle(guess) {
    getRiddlesFromContract();
    const riddlesStore = get(riddles);
    guess = [];
    var guessString = "";
    if (riddlesStore && riddlesStore.length) {
        // try {
        //     button = document.getElementById(
        //         "submitGuessButton"
        //     ) as HTMLButtonElement;
        //     button.innerHTML = "Submit Answer";
        //     button.classList.remove("btn-disabled");
        // } catch (error) {
        //     console.log(error);
        // }

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
            // activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
            activeRiddle.set(unsolvedRiddles[activeRiddleIndexStore]);
            const activeRiddleStore = get(activeRiddle);
            const minDepositAmountStore = get(minDepositAmount);
            calculatePayout(activeRiddleStore, minDepositAmountStore);
            console.log(activeRiddleStore.answerStructure);
            let riddleStructureArray = [];
            console.log(activeRiddleStore.answerStructure.length);
            for (let i = 0; i < activeRiddleStore.answerStructure.length; i++) {
                riddleStructureArray.push(activeRiddleStore.answerStructure[i]);
            }
            console.log(riddleStructureArray);

            riddleStructure.set(riddleStructureArray);
            
        }
    } else {
    }
}

export default getRandomRiddle;