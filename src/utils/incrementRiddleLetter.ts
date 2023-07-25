import isAlphanumericOrNumber from "./isAlphanumericOrNumber";
import { setAlert } from "./setAlert";

function incrementRiddleLetter(e, riddleStructure, i,guess) {
    if (e.keyCode === 16) {
        return;
    }

    if (e.key !== "Backspace") {
        if (!isAlphanumericOrNumber(e)) {
            setAlert(
                "warning",
                "Please limit answers to alphanumeric characters and spaces"
            );
            e.preventDefault();
            return; // Prevent the default behavior for non-alphanumeric and non-number keys
        }

        console.log("incrementUp");
        const submitGuessInputs = document.getElementById(
            "submitGuessInputs"
        ) as HTMLInputElement;
        const guessInputDivs = submitGuessInputs.getElementsByClassName(
            "answerElement"
        ) as any;
        console.log(submitGuessInputs);
        console.log(riddleStructure[i + 1]);
        if (riddleStructure[i + 1] === "{") {
            setTimeout(() => {
                guessInputDivs[i + 1].focus();
            }, 10);
            return;
        } else if (riddleStructure[i + 1] === " ") {
            setTimeout(() => {
                guessInputDivs[i + 2].focus();
            }, 10);

            return;
        } else {
            return;
        }
    } else {
        console.log(e);
        //listen for backspace
        console.log("incrementDown");
        const submitGuessInputs = document.getElementById(
            "submitGuessInputs"
        ) as HTMLInputElement;
        const guessInputDivs = submitGuessInputs.getElementsByClassName(
            "answerElement"
        ) as any;
        console.log(guessInputDivs[i].value);

        if (guessInputDivs[i].value) {
            guess[i] = "";
            return;
        }

        if (riddleStructure[i - 1] === "{") {
            guessInputDivs[i - 1].focus();
            return;
        } else if (riddleStructure[i - 1] === " ") {
            guessInputDivs[i - 2].focus();
            return;
        } else {
            return;
        }
        //     else if (guessInputDivs[i - 1].value) {
        //         guessInputDivs[i - 1].focus();
        //         return;
        //     } else {
        //         guessInputDivs[i - 1].focus();
        //         return;
        //     }
        // } else if (riddleStructure[i - 1] === " ") {
        //     guessInputDivs[i - 2].focus();
        // } else {
        //     // guessInputDivs[i - 1].focus();
        // }
        // console.log(this)
        // console.log("guess1", guess);
    }

    // console.log(submitGuessInputs);
    // console.log(riddleStructure[i - 1]);
    // if (riddleStructure[i - 1] === "{") {
    //     guessInputDivs[i - 1].focus();
    //     return;
    // } else if (riddleStructure[i - 1] === " ") {
    //     guessInputDivs[i - 2].focus();
    //     return;
    // } else {
    //     return;
    // }
}

export default incrementRiddleLetter;