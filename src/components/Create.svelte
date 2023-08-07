<script lang="ts">
    import { ethereumAccount } from "../store/account";
    import {
        createdRiddleIndex,
        createdRiddle,
        createdAnswer,
    } from "../store/riddles";
    import { hasMetamask, isSepolia } from "../store/account";
    import checkForEthereum from "../utils/checkForEthereum";
    import connectMetaMask from "../utils/connectMetamask";
    import createRiddle from "../utils/createRiddle";
    import { isModalOpen } from "../store/alert";
    import preventSpecialChar from "../utils/preventSpecialCharacter";
    import switchChainToSepolia from "../utils/switchChainToSepolia";
    import { ethers } from "ethers";
    import { formatEther } from "ethers/lib/utils";
    import { setAlert } from "../utils/setAlert";
    // on:keydown={(e) => preventSpecialChar(e)}
// 
    //checks
    checkForEthereum();

    let createRiddleButton;
    let submitQuestion: string="";
    let submitAnswer: string="";
    let reward: number;
    
    function removSpecialCharacters(){
    //if submitanswer has special characters, remove them
    if(submitAnswer.length >= 0){
        submitAnswer = submitAnswer.replace(/[^a-zA-Z0-9 ]/g, "");
        setAlert("warning", "Please limit answers to alphanumeric characters and spaces.")
    }
}

    // setInterval(() =>{
    //     removSpecialCharacters();
    // }, 10000
    // )
</script>

<div id="homeText" class="max-w-6/12">
    <p
        style=" font-size: 2em;
    font-weight: 900;
    width: 100%;
    text-shadow: 2px 2px 0px #000000;
    line-height: normal;"
    >
        Submit a riddle or a piece of trivia, then share with friends!
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
                            bind:value={submitAnswer}
                            on:input={()=> removSpecialCharacters()}
                            type="text"
                            placeholder="Answer"
                            class="input input-bordered input-primary w-full max-w-xs"
                        />

                        <input
                            bind:value={reward}
                            type="number"
                            placeholder="Reward (ETH)"
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
                                on:click={() =>
                                    createRiddle(
                                        submitQuestion,
                                        submitAnswer,
                                        ethers.utils.parseEther(reward.toString())
                                    )}
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
                            id="switchToSepoliaButton"
                            class="btn"
                            on:click={async () => switchChainToSepolia()}
                            >Switch chain To Sepolia</button
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
                {#if $createdRiddle}
                <button class="btn modal-button" on:click={() => isModalOpen.set(true)}
                    >View Created Riddle</button
                >
                {/if}
            </div>
           
        </div>
    </div>
</div>

{#if $createdRiddle}
   

    <div class="modal" class:modal-open={$isModalOpen}>
        <div class="modal-box">
            <h3 class="font-bold text-lg">Submission successful!</h3>
            <h3 class="font-bold text-lg">
                Save this information. The answer will be encrypted on chain and
                won't be revealed again until the riddle is solved.
            </h3>
            <h2 style="margin-bottom:10px;" class="card-title text-med">
                Riddle ID: {$createdRiddleIndex} (Share this number with friends. They can enter it in on the homepage to find your submission.)
            </h2>
            Creator: {$createdRiddle.creator}
            Question: {$createdRiddle.question}<br />
            Answer: {$createdAnswer}<br />
            Initial Reward Amount: (wei): {ethers.utils.formatEther($createdRiddle.createRiddleRewardAmount)} ETH<br
            />

            <div class="modal-action">
                <button class="btn" on:click={() => isModalOpen.set(false)}
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

    .class-title{
        font-size:.5rem;
    }
</style>
