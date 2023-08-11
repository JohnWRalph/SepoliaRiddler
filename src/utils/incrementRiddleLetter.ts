import isAlphanumericOrNumber from "./isAlphanumericOrNumber";
import { setAlert } from "./setAlert";

function incrementRiddleLetter(e, riddleStructure, i, guess) {
    //control userform input, when typeing in answers
    //move foward or backward through input boxes
    //no special characters

    //allow tab to next reward field
    if (e.keyCode === 16) {
        return;
    }

    if (e.keyCode === 229) {
        // console.log("mobile")
        const submitGuessInputs = document.getElementById(
            "submitGuessInputs"
        ) as HTMLInputElement;
        const guessInputDivs = submitGuessInputs.getElementsByClassName(
            "answerElement"
        ) as any;
        setTimeout(() => {
            // guessInputDivs[i].focus();

            //if the guess[i] is alphanumeric with regex

            if (guess[i].match(/^[0-9a-zA-Z]+$/)) {
                console.log(guess[i])
            } else {
                //if not alphanumeric, set to empty string
                console.log("not alphanumeric")
                guess[i] = "";
                guessInputDivs[i].value = "";
                setAlert("warning", "Please limit answers to alphanumeric characters and spaces.")
                setTimeout(() => {
                    guessInputDivs[i].focus();
                   
                }, 0);
                // guessInputDivs[i].focus();
                
                return;
            }

        }, 10);


    }

    //if not backspace
    if (e.key !== "Backspace") {
        //check for special character
        if (!isAlphanumericOrNumber(e)) {
            //     setAlert(
            //         "warning",
            //         "Please limit answers to alphanumeric characters and spaces"
            //     );
            console.log("debug")
            e.preventDefault();
            setAlert("warning", "Please limit answers to alphanumeric characters and spaces.")
            return;
            //     return; // Prevent the default behavior for non-alphanumeric and non-number keys
        }

        //get the all input boxes for guess from document 
        const submitGuessInputs = document.getElementById(
            "submitGuessInputs"
        ) as HTMLInputElement;

        const guessInputDivs = submitGuessInputs.getElementsByClassName(
            "answerElement"
        ) as any;

        //riddle structure is the concealed answer character with { for letters and spaces for spaces
        //example, answer:"A piano" concealed answer: "{ {{{{{"


        //if the value of the input box is not a space
        //it is a concealed character, move forward one space
        if (riddleStructure[i + 1] === "{") {
            setTimeout(() => {
                guessInputDivs[i + 1].focus();
            }, 10);
            return;
            //if space, move forward two spaces
        } else if (riddleStructure[i + 1] === " ") {
            setTimeout(() => {
                guessInputDivs[i + 2].focus();
            }, 10);
            return;
        } else {
            return;
        }
        // if backspace
    } else {
        console.log(e)
        if (!isAlphanumericOrNumber(e)) {
         
            e.preventDefault();
        }
        //get inputs
        const submitGuessInputs = document.getElementById(
            "submitGuessInputs"
        ) as HTMLInputElement;
        const guessInputDivs = submitGuessInputs.getElementsByClassName(
            "answerElement"
        ) as any;
        //set empty spaces to empty space vale for when reading 
        //document for user guess value
        if (guessInputDivs[i].value) {
            guess[i] = "";
            return;
        }

        //if the value of the input box is not a space
        //it is a concealed character, move backward one space
        if (riddleStructure[i - 1] === "{") {
            guessInputDivs[i - 1].focus();
            return;
            //if space, move backward two spaces
        } else if (riddleStructure[i - 1] === " ") {
            guessInputDivs[i - 2].focus();
            return;
        } else {
            return;
        }
    }
}

export default incrementRiddleLetter;