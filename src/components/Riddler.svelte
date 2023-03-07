<script lang="ts">
    import { BigNumber } from "ethers";
    import { push } from "svelte-spa-router";
import { ethereumAccount } from "../store/account";
    import contract from "../store/contract";
    import {
        riddles,
        activeRiddle,
        activeRiddleIndex,
        minDepositAmount,
    } from "../store/riddles";
    import GameTabs from "./buttons/GameTabs.svelte";
    //     import { Buffer as BufferPolyfill } from "buffer";
    //    var Buffer: typeof BufferPolyfill;
    //     globalThis.Buffer = BufferPolyfill;

    let guessLength = Array(10);
    let guess: string = "";
    let txHash: string;

    enum Outcome {
        WIN,
        LOSE,
        NOTHING,
    }

    let outcome: Outcome = Outcome.NOTHING;
    async function submitGuess() {
        console.log($minDepositAmount);
        const tx = await $contract.guess($activeRiddleIndex, guess, {
            value: $minDepositAmount,
        });

        txHash = tx.hash;
        const receipt = await tx.wait(1);
        (receipt.events || []).find((event) => {
            if (event.event === "RiddleSolved") {
                console.log(Outcome);
                outcome = Outcome.WIN;
            } else {
                outcome = Outcome.LOSE;
            }
        });
    }
    async function getRandomRiddle() {
        if ($riddles && $riddles.length) {
            const unsolvedRiddles = $riddles.filter((obj) =>
                obj.isSolved === false)
            ;

            // console.log(unsolvedRiddles);
            activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
            console.log(activeRiddleIndex)
            while ($riddles[$activeRiddleIndex].isSolved === true) {
                activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
            }
            activeRiddle.set($riddles[$activeRiddleIndex]);

            console.log($activeRiddle);
        } else {
            push("/")
        }
    }
 getRandomRiddle()
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <div class="stack">
                <div class="card shadow-md bg-primary text-primary-content">
                    <div class="card-body">
                        <h2 class="card-title">Riddle# {$activeRiddleIndex}</h2>
                            Question: {$activeRiddle.question}<br> 
                            Guess Cost: {$minDepositAmount} wei<br />
                            Reward Amount (wei): {$activeRiddle.createRiddleRewardAmount}
                        
                        <div id="submitGuess">
                            <input
                                bind:value={guess}
                                type="text"
                                placeholder="Answer here"
                                class="input input-bordered input-primary w-full max-w-xs"
                            />
                            <button
                                on:click={submitGuess}
                                id="submitGuessButton"
                                class="btn">Submit answer</button
                            >
                        </div>
                    </div>
                </div>
                <div class="card shadow bg-primary text-primary-content">
                    <div class="card-body" />
                </div>
                <div class="card shadow-sm bg-primary text-primary-content">
                    <div class="card-body" />
                </div>
            </div>
        </div>
    </div>
</div>

{#if txHash}
    Guess TxHash: <a
        target="_blank"
        href="https://goerli.etherscan.io/tx/{txHash}">{txHash}</a
    >
{:else}{/if}

{#if outcome === Outcome.WIN}
    YOU WON! The answer was {guess}
{:else if outcome === Outcome.LOSE}
    You lost, wrong guess!
{/if}

<br />

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .carousel {
        /* border: 1px solid white; */
    }
    #allRiddles {
        padding-left: 50px;
        padding-right: 50px;
        border: 1px solid white;
        border-radius: 20px;
    }

    .card {
        /* position: absolute; */
        /* justify-content: center; */
        /* text-align: center; */
        /* top:0; */
        /* left:20%; */
        /* width: 50%; */
        /* height: 50%; */
        /* top: 15%; */
    }

    #game {
        /* position:absolute;
        width: 50%;
        height:50%;
        top:25%; */
    }
    .input {
    }

    #submitGuess {
        display: flex;
    }
</style>
