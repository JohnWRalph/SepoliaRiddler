<script lang="ts">
    import {
        activeRiddle,
        isLoadingRiddles,
        riddleSolvedNotification,
        riddleSolvedNotificationText,
        riddleStructure,
    } from "../store/riddles";
    import checkForEthereum from "../utils/checkForEthereum";
    import truncateDescription from "../utils/truncateDescription";
    import getRiddlesFromContract from "../utils/getRiddlesFromcontract";
    import getRiddleByIndex from "../utils/getRiddleByIndex";
    import getRandomRiddle from "../utils/getRandomRiddle";
    import submitGuess from "../utils/submitGuess";
    import incrementRiddleLetter from "../utils/incrementRiddleLetter";
    import { ethers } from "ethers";
    //checks
    checkForEthereum();
    getRiddlesFromContract();
    let guess: string[] = [];
    let button;
    let riddleIndex: number;
</script>
<img loading="lazy" class="riddlerImage" src="Riddler.png" alt="" />
<div id="homeText" class="max-w-6/12">
    <p
        style=" font-size: 2em;
    font-weight: 900;
    width: 100%;
    text-shadow: 2px 2px 0px #000000;
    line-height: normal;"
        class="py-8"
    >
        Solve Riddles and Trivia To Earn GETH.
    </p>
</div>
<div style="display:flex; flex-direction:row;" class="join">
    <input
        id="inputField"
        style="border-bottom-right-radius:0; border-top-right-radius:0;"
        type="text"
        placeholder="Riddle ID"
        class="input join-item input-bordered w-full max-w-xs"
        bind:value={riddleIndex}
    />
    <button
        style="border-bottom-left-radius:0; border-top-left-radius:0;"
        class="btn btn-primary join-item"
        on:click={() => getRiddleByIndex(riddleIndex, guess)}
        >get riddle by index</button
    >
</div>
<br />
<button
    on:click={() => getRandomRiddle(guess)}
    class="btn btn-primary btn-bordered">Get Random Riddle</button
>
<br />
<div
    style="display:flex; flex-direction:column;"
    class="hero shadow-md bg-primary text-primary-content"
>
    <div class="card-body">
        {#if $activeRiddle}
            <div class="card shadow-md bg-primary text-primary-content">
                <div class="cardQuestion">
                    {$activeRiddle.question}
                </div>
                <div class="overflow-x-auto">
                    <table style="width:100%;" class="table table-zebra">
                        <!-- head -->

                        <tbody style="border-radius:0px;">
                            <!-- row 1 -->

                            <tr>
                                <td style="width:25%;">Creator</td>
                                <td
                                    >{truncateDescription(
                                        $activeRiddle.creator
                                    )}</td
                                >
                            </tr>
                            <!-- row 2 -->
                            <tr>
                                <td>Initial reward</td>
                                <td>{ethers.utils.formatEther($activeRiddle.createRiddleRewardAmount)} ETH</td
                                >
                            </tr>
                            <!-- row 3 -->
                            <tr>
                                <td>Wrong Guess Bonus</td>
                                <td>{ethers.utils.formatEther($activeRiddle.wrongGuessRewardAmount)}</td>
                            </tr>
                            <!-- row 4 -->
                            <tr>
                                <td>Id</td>
                                <td>{$activeRiddle.index}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="submitGuess">
                <h2 class="questionDetails">Enter Below</h2>
                <div id="submitGuessInputs">
                    {#if $activeRiddle && $activeRiddle.length}
                        {#each $riddleStructure as letter, i}
                            {#if letter === " "}
                                <div
                                    id="spacer-{i}"
                                    class="spacer answerElement"
                                    style="width:50px; margin:5px; background-color:transparent"
                                />
                            {:else if letter === "{"}
                                <input
                                    on:keydown={(e) =>
                                        incrementRiddleLetter(
                                            e,
                                            $riddleStructure,
                                            i,
                                            guess
                                        )}
                                    id="spacer-{i}"
                                    style="width:50px; text-align:center; margin:5px;
                          border-radius:5px; border:1px solid black;"
                                    bind:value={guess[i]}
                                    maxlength="1"
                                    type="text"
                                    placeholder=" "
                                    class="autotab answerElement input input-bordered input-primary w-full max-w-xs"
                                />
                            {/if}
                        {/each}
                    {/if}
                </div>
                <div>
                    {#if button && button.disabled && $activeRiddle.isSolved === false}
                        <button id="submitGuessButton" class="btn btn-disabled"
                            >Submitting answer..</button
                        >
                    {:else}
                        <button
                            on:click={() => submitGuess(guess)}
                            id="submitGuessButton"
                            class="btn">Submit answer</button
                        >
                    {/if}
                </div>
                <!-- svelte-ignore empty-block -->
            </div>
        {:else if !$activeRiddle}
            Search for or find a random riddle
        {:else if $isLoadingRiddles}
            <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                />
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        {:else}
            <h2>No active Riddles!</h2>
        {/if}
    </div>
    {#if $riddleSolvedNotification === true}
        <p class="questionDetails" style="word-break:break-word">
            {$riddleSolvedNotificationText}
        </p>
    {:else if $riddleSolvedNotification === false}
        <p class="questionDetails" style="word-break:break-word">
            {$riddleSolvedNotificationText}
        </p>
    {/if}
</div>
<br />
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    #submitGuess {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #submitGuessInputs {
        display: flex;
        flex-wrap: wrap;
    }
    .btn-disabled {
        background-color: #6b7280;
        cursor: not-allowed;
        color: black;
    }
    .riddlerImage {
        position: relative;
        top: 0px;
        margin-left: 20px;
        margin-right: 20px;
        min-height: 135px;
    }
    .card {
        display: flex;
        grid-gap: 5px;
        width: 600px;
        /* min-width:600px; */
        margin: 0 auto;
        gap: 10px;
        border: 1px solid black;
        box-shadow: 10px 10px 0px 0px #000000;
    }
    .questionDetails {
        font-size: 2em;
        font-weight: 900;
        width: 80%;
        text-shadow: 2px 2px 0px #000000;
        line-height: normal;
        word-break: break-word;
    }
    .cardQuestion {
        font-size: 1.5em;
        font-weight: 900;
        width: 80%;
        margin-left: 10%;
        text-shadow: 2px 2px 0px #000000;
        line-height: normal;
        word-break: break-word;
    }
    .hero {
        display: flex;
        grid-gap: 5px;
        width: 800px;
        /* min-width:600px; */
        margin: 0 auto;
        gap: 10px;
        border: 1px solid black;
        border-radius: 20px;
        box-shadow: 10px 10px 0px 0px #000000;
    }

    .autotab:focus-within {
        border: 1px solid #2563eb;
        box-shadow: 0 0 0 2px #d6e4ff;
        outline: none;
    }
    @media (min-width: 675px) and (max-width: 900px) {
        .card {
            width: 90%;
        }
    }
    @media (max-width: 675px) {
        .card {
            width: 90%;
            font-size: 0.8em;
        }
        .riddlerImage {
            width: 90%;
        }
        #homeText {
            /* margin-top:-120px; */
        }
    }
</style>
