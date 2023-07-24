<script lang="ts">
    import { ethereumAccount } from "../store/account";
    import contract from "../store/contract";
    import {
        riddles,
        activeRiddle,
        activeRiddleIndex,
        minDepositAmount,
        payout,
        isLoadingRiddles,
        createdRiddleIndex,
        createdRiddle,
        createdAnswer,
        convertedRiddle,
        riddleStructure,
    } from "../store/riddles";
    import { hasMetamask, isGoerli } from "../store/account";
    import { Contract, ethers } from "ethers";
    import checkForEthereum from "../utils/checkForEthereum";
    import checkChainForGoerli from "../utils/checkChainForGoerli";
    import switchChainToGoerli from "../utils/switchChainToGoerli";
    import connectMetaMask from "../utils/connectMetamask";
    import RIDDLER_ABI from "../abi/RIDDLER_ABI";
    import { setAlert } from "../utils/setAlert";
    import isAlphanumericOrNumber from "../utils/isAlphanumericOrNumber";

    //checks
    checkForEthereum();

    let guess: string = "";
    let txHash: string;
    let createRiddleButton;
    enum Outcome {
        WIN,
        LOSE,
        NOTHING,
    }

    let submitQuestion: string;
    let submitAnswer: string;
    let reward: number;

    async function createRiddle() {
        if ((await checkForEthereum()) === false) {
            setAlert(
                "error",
                "Please install metamask",
                "https://metamask.io/download/"
            );
            return;
        }

        if ((await checkChainForGoerli()) === false) {
            setAlert("error", "Please switch to Goerli");
            return;
        }

        if (!$ethereumAccount || !$ethereumAccount.length) {
            setAlert("error", "Please connect your wallet to submit a guess.");
            return;
        }
        if (!submitQuestion) {
            setAlert("error", "Please enter a question.");
            return;
        }
        if (!submitAnswer) {
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
            createRiddleButton = document.getElementById(
                "createRiddleButton"
            ) as HTMLButtonElement;

            createRiddleButton.disabled = true;
            //change style

            createRiddleButton.classList.add("btn-disabled");
        } catch (error) {
            console.log(error);
        }
        //replace characters in submitAnswer to { and keep spaces
        const answerStructure = submitAnswer.replace(/[^ ]/g, "{");
        console.log(answerStructure);

        try {
            const submittedRiddle = await newContract.createRiddle(
                submitQuestion,
                answerStructure,
                submitAnswer.toLowerCase(),
                reward,
                {
                    value: reward,
                }
            );

            setAlert(
                "success",
                "Riddle submitted! View on Etherscan:",
                "https://goerli.etherscan.io/tx/" + submittedRiddle.hash
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
            const riddlesLength = await getRiddlesLength();
            console.log(riddlesLength.toNumber());
            createdRiddleIndex.set(riddlesLength.toNumber() - 1);
            console.log($createdRiddleIndex);
            var newRiddle = await newContract.getRiddleByIndex(
                riddlesLength.toNumber() - 1
            );
            createdRiddle.set(newRiddle);
            createdAnswer.set(submitAnswer);
            isModalOpen = true;

            createRiddleButton.disabled = false;

            createRiddleButton.classList.remove("btn-disabled");
        }
    }

    async function getRiddlesLength() {
        const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        if (!provider) {
            setAlert("error", "No provider detected");
            return;
        }
        const contract = new Contract(
            import.meta.env.VITE_CONTRACT_ADDRESS,
            RIDDLER_ABI,
            provider.getSigner()
        );
        if (!contract) {
            setAlert("error", "Error connecting with contract");
            return;
        }
        const riddlesLength = await contract.getRiddlesLength();
        return riddlesLength;
    }
    let isModalOpen = false;
    let riddleStructureArray = [];
    async function convertAnswer() {
        riddleStructureArray = [];

        console.log(submitAnswer);
        // convert character to ! and keep spaces
        var convertedAnswerBefore = submitAnswer.replace(/[^ ]/g, "{");
        convertedRiddle.set(convertedAnswerBefore);
        // console.log($convertedRiddle[0]);

        for (let i = 0; i < $convertedRiddle.length; i++) {
            console.log($convertedRiddle[i]);
            riddleStructureArray.push($convertedRiddle[i]);
        }
        riddleStructure.set(riddleStructureArray);
        console.log($riddleStructure);
    }

    // const submitAnswerInput = document.getElementById(
    //     "submitAnswerInput"
    // ) as HTMLInputElement;
    // submitAnswerInput.addEventListener(
    //     "keypress",
        // function () {
        //     if (!isAlphanumericOrNumber(event)) {
        //         event.preventDefault(); // Prevent the default behavior for non-alphanumeric and non-number keys
        //     } else {
        //         // Your action for alphanumeric and number keys goes here
        //         // For example, you can perform some action on valid keypresses
        //         console.log("Valid keypress: " + event.key);
        //     }
        // }
    // );

    function preventSpecialChar (event: KeyboardEvent) {
                    if (!isAlphanumericOrNumber(event)) {
                        event.preventDefault();
                        setAlert("warning", "Please limit answers to alphanumeric characters and spaces.")
 // Prevent the default behavior for non-alphanumeric and non-number keys
                    } else {
                        // Your action for alphanumeric and number keys goes here
                        // For example, you can perform some action on valid keypresses
                        console.log("Valid keypress: " + event.key);
                    }
                }
</script>

<div id="homeText" class="max-w-6/12">
    <p
        style=" font-size: 2em;
    font-weight: 900;
    width: 100%;

  
    text-shadow: 2px 2px 0px #000000;
    line-height: normal;"
    >
        Submit a Riddle or a piece of Trivia, then share with friends!
    </p>

    <p
        style=" font-size: 2em;
font-weight: 900;
width: 70%;
line-height: normal;
margin-left:15%;
text-shadow: 2px 2px 0px #000000;
"
        class="py-6"
    >
        Guesses cost 1 wei. Wrong guesses increase the payout by that amount.
    </p>
</div>
<div class="max-w-md">
    <div class="stack">
        <div class="card shadow-md bg-primary text-primary-content">
            <div class="card-body">
                {#if $hasMetamask}
                    {#if $ethereumAccount && $ethereumAccount.length && $isGoerli}
                        <textarea
                            id="submitQuestionInput"
                            bind:value={submitQuestion}
                            placeholder="Question"
                            class="textarea textarea-bordered"
                        />
                        <input
                            id="submitAnswerInput"
                            on:keydown={(e) => preventSpecialChar(e)} 
                            bind:value={submitAnswer}
                            type="text"
                            placeholder="Answer"
                            class="input input-bordered input-primary w-full max-w-xs"
                        />

                        <input
                            bind:value={reward}
                            type="number"
                            placeholder="Reward (wei)"
                            class="input input-bordered input-primary w-full max-w-xs"
                        />
                        {#if createRiddleButton && createRiddleButton.disabled}
                            <button
                                id="createRiddleButton"
                                class="btn btn-disabled"
                            >
                                Submitting...
                            </button>
                        {:else}
                            <button
                                id="createRiddleButton"
                                on:click={() => createRiddle()}
                                class="btn"
                            >
                                Submit
                            </button>
                        {/if}
                    {:else if !$ethereumAccount}
                        <h1>No wallet Detected</h1>
                        <button class="btn" on:click={() => connectMetaMask()}
                            >Connect Ethereum Wallet</button
                        >
                    {:else if $ethereumAccount && $ethereumAccount.length}
                        <button
                            id="switchToGoerliButton"
                            class="btn"
                            on:click={async () => switchChainToGoerli()}
                            >Switch chain To Goerli</button
                        >
                    {/if}
                {:else}
                    <button
                        class="btn btn-primary"
                        on:click={() =>
                            window.open("https://metamask.io/download/")}
                        >Download Metamask</button
                    >
                {/if}
            </div>
        </div>
    </div>
</div>

{#if $createdRiddle}
    <button class="btn modal-button" on:click={() => (isModalOpen = true)}
        >View Created Riddle</button
    >

    <div class="modal" class:modal-open={isModalOpen}>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Submission successful!</h3>
            <h3 class="font-bold text-lg">
                Save this information. The answer will be encrypted on chain and won't be revealed again until the riddle is solved.
            </h3>
            <h2 class="card-title">
                Riddle ID: {$createdRiddleIndex}
            </h2>
            Creator: {$createdRiddle.creator}
            Question: {$createdRiddle.question}<br />
            Answer: {$createdAnswer}<br />
            Initial Reward Amount: (wei): {$createdRiddle.createRiddleRewardAmount}<br
            />

            <div class="modal-action">
                <button class="btn" on:click={() => (isModalOpen = false)}
                    >Close</button
                >
            </div>
        </div>
    </div>
{/if}

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .btn-disabled {
        background-color: #6b7280;
        cursor: not-allowed;
        color: black;
    }
</style>
