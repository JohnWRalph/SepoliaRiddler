import { activeRiddle, minDepositAmount, riddleSolvedNotification, riddleSolvedNotificationText } from "../store/riddles";
import { setAlert } from "./setAlert";
import {get} from 'svelte/store';
import checkForEthereum from "./checkForEthereum";
import checkChainForTaiko from "./checkChainForTaiko";
import switchChainToTaiko from "./switchChainToTaiko";
import { ethereumAccount } from "../store/account";
import { Contract, ethers } from "ethers";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import outcome, { Outcome } from "../store/outcome";


async function submitGuess(guess) {
    
    let guessString: string = "";
    if (!guess.length) {
        setAlert("error", "Please enter a guess");
        return;
    }
    console.log("guess", guess);
    console.log("guesslength", guess.length);
    const activeRiddleStore = get(activeRiddle);
    for (let i = 0; i < activeRiddleStore.answerStructure.length; i++) {
        console.log(guess[i]);
        if (!guess[i]) {
            guess[i] = " ";
        }
    }
    console.log("guess", guess);
    guessString = guess.join("");
    console.log(guessString);
    if ((await checkForEthereum()) === false) {
        return;
    }

    if ((await checkChainForTaiko()) === false) {
        //open metamask and switch to Taiko
        switchChainToTaiko();
        return;
    }
    const ethereumAccountStore = get(ethereumAccount);
    if (!ethereumAccountStore || !ethereumAccountStore.length) {
        setAlert("warning", "Please connect your wallet");
        return;
    }
    var button = document.getElementById(
        "submitGuessButton"
    ) as HTMLButtonElement;
    button.innerHTML = "Submitting...";
    button.classList.add("btn-disabled");

    try {
        const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );

        const contract = new Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            RIDDLER_ABI,
            provider.getSigner()
        );
const activeRiddleStore = get(activeRiddle);
const minDepositAmountStore = get(minDepositAmount);
        const tx = await contract.guess(
            activeRiddleStore.index,
            guessString.toLowerCase(),
            {
                value: minDepositAmountStore,
            }
        );
        const txHash = tx.hash;
        const receipt = await tx.wait(1);
        (receipt.events || []).find((event) => {
            if (event.event === "RiddleSolved") {
                outcome.set(Outcome.WIN);
                setAlert(
                    "success",
                    "You won! The answer was " + guessString,
                    "https://Taiko.etherscan.io/tx/" + txHash
                );
                riddleSolvedNotification.set(true);
                riddleSolvedNotificationText.set(
                    "You won! The answer was " +
                        guessString +
                        ". View on etherscan: https://explorer.l3test.taiko.xyz/tx/" +
                        txHash
                );
                setTimeout(() => {
                    try {
                        button = document.getElementById(
                            "submitGuessButton"
                        ) as HTMLButtonElement;

                        button.innerHTML = "Riddle Solved";
                        button.classList.add("btn-disabled");
                    } catch (error) {
                        console.log(error);
                    }
                }, 100);
            }
        });

        if (receipt.events.length === 0) {
            outcome.set(Outcome.LOSE);
            setAlert(
                "error",
                "You lost, wrong guess!",
                "https://explorer.l3test.taiko.xyz/tx/" + txHash
            );
            button.innerHTML = "Submit Answer";
            button.classList.remove("btn-disabled");

            riddleSolvedNotification.set(false);
            riddleSolvedNotificationText.set("Wrong answer! Try again.");
        }
    } catch (error) {
        console.log(error);
        if (error.code === "ACTION_REJECTED") {
            setAlert("error", "You rejected the transaction");
        }
        button.innerHTML = "Submit Answer";
        button.classList.remove("btn-disabled");
    }
}

export default submitGuess;