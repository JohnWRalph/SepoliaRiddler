import { activeRiddle, minDepositAmount, riddleSolvedNotification, riddleSolvedNotificationText } from "../store/riddles";
import { setAlert } from "./setAlert";
import { get } from 'svelte/store';
import checkForEthereum from "./checkForEthereum";
import checkChainForSepolia from "./checkChainForSepolia";
import switchChainToSepolia from "./switchChainToSepolia";
import { ethereumAccount } from "../store/account";
import { Contract, ethers } from "ethers";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import outcome, { Outcome } from "../store/outcome";


async function submitGuess(guess) {
    //guesString will be the value submitted to the blockchain
    let guessString: string = "";
    if (!guess.length) {
        setAlert("error", "Please enter a guess");
        return;
    }
    //get activeRiddle from svelte store
    const activeRiddleStore = get(activeRiddle);

    //answer guess retrieved from document is an array
    //convert to string
    for (let i = 0; i < activeRiddleStore.answerStructure.length; i++) {
        if (!guess[i]) {
            guess[i] = " ";
        }
    }
    guessString = guess.join("");
    //if ethereum is not available, return
    if ((await checkForEthereum()) === false) {
        return;
    }


    //if chain is not sepolia, switch to sepolia
    if ((await checkChainForSepolia()) === false) {
        //open metamask and switch to Sepolia
        switchChainToSepolia();
        return;
    }
    //get ethereum account from svelte store
    const ethereumAccountStore = get(ethereumAccount);
    if (!ethereumAccountStore || !ethereumAccountStore.length) {
        setAlert("warning", "Please connect your wallet");
        return;
    }

    //disable button and change text to submitting
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

        //wait for transaction to be mined
        const receipt = await tx.wait(1);
        (receipt.events || []).find((event) => {
            //if after one block, the event is RiddleSolved, set outcome to win
            if (event.event === "RiddleSolved") {
                outcome.set(Outcome.WIN);
                setAlert(
                    "success",
                    "You won! The answer was " + guessString,
                    "https://sepolia.etherscan.io/tx/" + txHash
                );
                //display riddle solved notification text
                riddleSolvedNotification.set(true);
                riddleSolvedNotificationText.set(
                    "You won! The answer was " +
                    guessString +
                    ". View on Sepolia Explorer: https://sepolia.etherscan.io/tx/" +
                    txHash
                );

                //prevent user from submitting another guess for solved riddle
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
        //if no events, set outcome to lose
        if (receipt.events.length === 0) {
            outcome.set(Outcome.LOSE);
            setAlert(
                "error",
                "You lost, wrong guess!",
                "https://sepolia.etherscan.io/tx/" + txHash
            );
            //reset button
            button.innerHTML = "Submit Answer";
            button.classList.remove("btn-disabled");

            riddleSolvedNotification.set(false);
            riddleSolvedNotificationText.set("Wrong answer! Try again.");
        }
    } catch (error) {
        console.log(error);
        //if rejected from wallet, set alert
        if (error.code === "ACTION_REJECTED") {
            setAlert("error", "You rejected the transaction");
        }
        //reset submit button
        button.innerHTML = "Submit Answer";
        button.classList.remove("btn-disabled");
    }
}

export default submitGuess;