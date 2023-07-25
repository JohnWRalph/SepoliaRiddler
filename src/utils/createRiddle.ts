import { Contract, ethers } from "ethers";
import { toUtf8Bytes } from "ethers/lib/utils";
import { get } from "svelte/store";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import { ethereumAccount } from "../store/account";
import { isModalOpen } from "../store/alert";
import { createdAnswer, createdRiddle, createdRiddleIndex } from "../store/riddles";
import checkChainForTaiko from "./checkChainForTaiko";
import checkForEthereum from "./checkForEthereum";
import getRiddlesLength from "./getRiddlesCount";
import { setAlert } from "./setAlert";

async function createRiddle(question,answer,reward) {
    if ((await checkForEthereum()) === false) {
        setAlert(
            "error",
            "Please install metamask",
            "https://metamask.io/download/"
        );
        return;
    }

    if ((await checkChainForTaiko()) === false) {
        setAlert("error", "Please switch to Taiko");
        return;
    }
const ethereumAccountStore = get(ethereumAccount)
    if (!ethereumAccountStore || !ethereumAccountStore.length) {
        setAlert("error", "Please connect your wallet to submit a guess.");
        return;
    }
    if (!question) {
        setAlert("error", "Please enter a question.");
        return;
    }
    if (!answer) {
        setAlert("error", "Please enter an answer.");
        return;
    }
    if (!reward) {
        setAlert("error", "Please enter a reward.");
        return;
    }
    //if reward is not a whole integer
    if (reward % 1 !== 0) {
        setAlert("error", "Please enter a whole number for the reward.");
        return;
    }
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    if (!provider) {
        setAlert("error", "No provider detected");
        return;
    }

    const newContract = new Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        RIDDLER_ABI,
        provider.getSigner()
    );

    if (!newContract) {
        setAlert("error", "Error connecting with contract");
        return;
    }
    var checkPointReached = false;

    try {
        var createRiddleButton = document.getElementById(
            "createRiddleButton"
        ) as HTMLButtonElement;

        createRiddleButton.disabled = true;
        //change style

        createRiddleButton.classList.add("btn-disabled");
    } catch (error) {
        console.log(error);
    }
    //replace characters in submitAnswer to { and keep spaces
    const answerStructure = answer.replace(/[^ ]/g, "{");
    console.log(answerStructure);

    try {
        const submittedRiddle = await newContract.createRiddle(
            question,
            answerStructure,
            ethers.utils.keccak256(toUtf8Bytes(answer.toLowerCase())),
            reward,
            {
                value: reward,
            }
        );
console.log("after submit",submittedRiddle);
        setAlert(
            "success",
            "Riddle submitted! View on Taiko Explorer:",
            "https://explorer.l3test.taiko.xyz/tx/" + submittedRiddle.hash
        );
        const submittedRiddleReceipt = await submittedRiddle.wait(1);
        console.log(submittedRiddleReceipt);
        console.log("after receipt");
        checkPointReached = true;
    } catch (error) {
        if (error.code === "ACTION_REJECTED") {
            setAlert("error", "Transaction rejected by User.");
            createRiddleButton.disabled = false;

            //change style

            createRiddleButton.classList.remove("btn-disabled");
        }
    } finally {
        // const receipt = submittedRiddle.wait();
        if (!checkPointReached) {
            return;
        }
        const riddlesCount = await getRiddlesLength();
        console.log(riddlesCount.toNumber());
        createdRiddleIndex.set(riddlesCount.toNumber() - 1);
        
        var newRiddle = await newContract.getRiddleByIndex(
            riddlesCount.toNumber() - 1
        );
        createdRiddle.set(newRiddle);
        createdAnswer.set(answer);
        isModalOpen.set(true)

        createRiddleButton.disabled = false;

        createRiddleButton.classList.remove("btn-disabled");
    }
}

export default createRiddle;