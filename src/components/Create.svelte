<script lang="ts">
    import { ethereumAccount } from "../store/account";
    import {
     
        createdRiddleIndex,
        createdRiddle,
        createdAnswer,
        convertedRiddle,
        riddleStructure,
    } from "../store/riddles";
    import { hasMetamask, isTaiko } from "../store/account";
    import checkForEthereum from "../utils/checkForEthereum";
    import connectMetaMask from "../utils/connectMetamask";
    import createRiddle from "../utils/createRiddle";
    import { isModalOpen } from "../store/alert";
    import preventSpecialChar from "../utils/preventSpecialCharacter";
    import switchChainToTaiko from "../utils/switchChainToTaiko";

    //checks
    checkForEthereum();

    let createRiddleButton;
    let submitQuestion: string;
    let submitAnswer: string;
    let reward: number;
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
                    {#if $ethereumAccount && $ethereumAccount.length}
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
                                on:click={() => createRiddle(submitQuestion, submitAnswer, reward)}
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
                            id="switchToTaikoButton"
                            class="btn"
                            on:click={async () => switchChainToTaiko()}
                            >Switch chain To Taiko</button
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
    <button class="btn modal-button" on:click={() => (isModalOpen.set(true))}
        >View Created Riddle</button
    >

    <div class="modal" class:modal-open={$isModalOpen}>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Submission successful!</h3>
            <h3 class="font-bold text-lg">
                Save this information. The answer will be encrypted on chain and
                won't be revealed again until the riddle is solved.
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
                <button class="btn" on:click={() => (isModalOpen.set(false))}
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
