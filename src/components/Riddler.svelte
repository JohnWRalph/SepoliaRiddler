<script lang="ts">
    import { ethereumAccount } from "../store/account";
    import {
        riddles,
        activeRiddle,
        activeRiddleIndex,
        minDepositAmount,
        payout,
        isLoadingRiddles,
        riddleSolvedNotification,
        riddleSolvedNotificationText,
    } from "../store/riddles";
    import { hasMetamask } from "../store/account";
    import { Contract, ethers } from "ethers";
    import checkForEthereum from "../utils/checkForEthereum";
    import checkChainForGoerli from "../utils/checkChainForGoerli";
    import switchChainToGoerli from "../utils/switchChainToGoerli";
    import RIDDLER_ABI from "../abi/RIDDLER_ABI";
    import { setAlert } from "../utils/setAlert";
    import { calculatePayout } from "../utils/calculatePayout";
    import RiddleCard from "./RiddleCard.svelte";
    import truncateDescription from "../utils/truncateDescription";
    //checks
    checkForEthereum();

    let guess: string[] = [];
    let txHash: string;

    enum Outcome {
        WIN,
        LOSE,
        NOTHING,
    }
    let button;
let guessString;
    let outcome: Outcome = Outcome.NOTHING;

    async function submitGuess() {
        console.log($activeRiddle.index);
        console.log(guess);
        // let guessString: string = "";
        if (!guess.length) {
            setAlert("error", "Please enter a guess");
            return;
        }
        console.log("guess", guess);
        console.log("guesslength", guess.length);

        for (let i = 0; i < $activeRiddle.answerLength; i++) {
            console.log(guess[i]);
            if (!guess[i]) {
                guess[i] = " ";
            }
        }
        console.log("guess", guess);
        guessString = guess.join("");
        console.log("guessString", typeof guessString);
        console.log("guessStringlength", guessString.length);
        // console.log("guessString",guessString);
        // console.log("guessStringlength",guessString.length);
        //add all elements of array to string and if element is empty replace with space
        // let guessJoined = guess.join(",");
        // console.log("guessJoined",guessJoined);
        // let guessString = guessJoined.replace(/,,/g, " ");
        // console.log("guessString",guessString);
        // console.log("guessStringlength",guessString.length);
        // if element is empty replace with space

        if ((await checkForEthereum()) === false) {
            return;
        }

        if ((await checkChainForGoerli()) === false) {
            //open metamask and switch to goerli
            switchChainToGoerli();
            return;
        }

        if (!$ethereumAccount || !$ethereumAccount.length) {
            setAlert("warning", "Please connect your wallet")
            return;
        }
        button = document.getElementById(
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

            const tx = await contract.guess($activeRiddle.index, guessString, {
                value: $minDepositAmount,
            });

            txHash = tx.hash;
            const receipt = await tx.wait(1);
            (receipt.events || []).find((event) => {
                if (event.event === "RiddleSolved") {
                    outcome = Outcome.WIN;
                    setAlert(
                        "success",
                        "You won! The answer was " + guessString,
                        "https://goerli.etherscan.io/tx/" + txHash
                    );
                    riddleSolvedNotification.set(true);
                    riddleSolvedNotificationText.set(
                        "You won! The answer was " +
                            guessString +
                            ". view on etherscan: https://goerli.etherscan.io/tx/" +
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
                outcome = Outcome.LOSE;
                setAlert(
                    "error",
                    "You lost, wrong guess!",
                    "https://goerli.etherscan.io/tx/" + txHash
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
    async function getRandomRiddle() {
        guess = [];
        guessString = "";
        if ($riddles && $riddles.length) {
            try {
                button = document.getElementById(
                    "submitGuessButton"
                ) as HTMLButtonElement;
                button.innerHTML = "Submit Answer";
                button.classList.remove("btn-disabled");
            } catch (error) {
                console.log(error);
            }

            isLoadingRiddles.set(false);
            const unsolvedRiddles = $riddles.filter(
                (obj) => obj.isSolved === false
            );
            activeRiddleIndex.set(
                Math.floor(Math.random() * unsolvedRiddles.length)
            );
            if (unsolvedRiddles[$activeRiddleIndex].isSolved === false) {
                // activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
                activeRiddle.set(unsolvedRiddles[$activeRiddleIndex]);
                calculatePayout($activeRiddle, $minDepositAmount);
                console.log($activeRiddle);
            }
        } else {
        }
    }
    async function getRiddleByIndex(index) {
        guess = [];
        guessString = "";
        let provider;
        console.log("index", index);
        if ($hasMetamask) {
            provider = new ethers.providers.Web3Provider(
                (window as any).ethereum
            );
            const newContract = new Contract(
                import.meta.env.VITE_CONTRACT_ADDRESS,
                RIDDLER_ABI,
                provider.getSigner()
            );
            let riddle;
            try {
                riddle = await newContract.getRiddleByIndex(riddleIndex);
            } catch (error) {
                console.log(error);
                setAlert("error", "Not a valid Riddle ID");
                return;
            }
            activeRiddle.set(riddle);
            activeRiddleIndex.set(index);
            console.log($activeRiddle);
            calculatePayout($activeRiddle, $minDepositAmount);
            
            setTimeout(() => {
                try {
                    button = document.getElementById(
                        "submitGuessButton"
                    ) as HTMLButtonElement;
                    if ($activeRiddle.isSolved === true) {
                        button.disabled = true;
                        button.innerHTML = "Riddle Solved";
                        button.classList.add("btn-disabled");
                    } else {
                        button.disabled = false;
                        button.innerHTML = "Submit Answer";
                        button.classList.remove("btn-disabled");
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 100);
        } else {
            provider = new ethers.providers.JsonRpcProvider(
                import.meta.env.VITE_API_KEY
            );
            const newContract = new Contract(
                import.meta.env.VITE_CONTRACT_ADDRESS,
                RIDDLER_ABI,
                provider
            );

            let riddle;
            try {
                riddle = await newContract.getRiddleByIndex(riddleIndex);
            } catch (error) {
                console.log(error);
                setAlert("error", "Not a valid Riddle ID");
                return;
            }
            activeRiddle.set(riddle);
            activeRiddleIndex.set(index);
            console.log($activeRiddle);
            calculatePayout($activeRiddle, $minDepositAmount);
            
            setTimeout(() => {
                try {
                    button = document.getElementById(
                        "submitGuessButton"
                    ) as HTMLButtonElement;
                    if ($activeRiddle.isSolved === true) {
                        button.disabled = true;
                        button.innerHTML = "Riddle Solved";
                        button.classList.add("btn-disabled");
                    } else {
                        button.disabled = false;
                        button.innerHTML = "Submit Answer";
                        button.classList.remove("btn-disabled");
                    }
                } catch (error) {
                    console.log(error);
                }
            }, 100);
        }
    }
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
        Solve the riddles and earn a reward.
    </p>
</div>
<div style="display:flex; flex-direction:row;" class="join">
    <input
        style="border-bottom-right-radius:0; border-top-right-radius:0;"
        type="text"
        placeholder="Riddle ID"
        class="input join-item input-bordered w-full max-w-xs"
        bind:value={riddleIndex}
    />
    <button
        style="border-bottom-left-radius:0; border-top-left-radius:0;"
        class="btn btn-primary join-item"
        on:click={() => getRiddleByIndex(riddleIndex)}
        >get riddle by index</button
    >
</div>
<br />
<button on:click={() => getRandomRiddle()} class="btn btn-primary btn-bordered"
    >Get Random Riddle</button
>
<br />

<div class="card shadow-md bg-primary text-primary-content">
    <div class="card-body">
        {#if $activeRiddle}
        <div class="card shadow-md bg-primary text-primary-content">
            <div class="cardQuestion">
                {$activeRiddle.question}
                ?
            </div>
            <div  class="overflow-x-auto">
                <table style="width:100%;"  class="table table-zebra">
                    <!-- head -->
        
                    <tbody style="border-radius:0px;">
                        <!-- row 1 -->
        
                        <tr>
                            <td style="width:25%;">Creator</td>
                            <td>{truncateDescription($activeRiddle.creator)}</td>
                        </tr>
        
                        <!-- row 2 -->
                        <tr>
                            <td>Initial reward</td>
                            <td>{$activeRiddle.createdRiddleRewardAmount}</td>
                        </tr>
                        <!-- row 3 -->
                        <tr>
                            <td>Wrong Guess Bonus</td>
                            <td>{$activeRiddle.wrongGuessRewardAmount}</td>
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
                <div id="submitGuessInputs">
                    {#if $activeRiddle && $activeRiddle.length}
                        {#each { length: $activeRiddle.answerLength } as _, i}
                            <input
                                style="width:50px; text-align:center; margin:5px;
                       border-radius:5px; border:1px solid black;"
                                bind:value={guess[i]}
                                maxlength="1"
                                type="text"
                                placeholder=" "
                                class="autotab input input-bordered input-primary w-full max-w-xs"
                            />
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
                            on:click={submitGuess}
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
    #submitGuessInputs{
        display:flex;
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
        max-width: 960px;
        margin: 0 auto;
        gap: 10px;
        border: 1px solid black;
        box-shadow: 10px 10px 0px 0px #000000;
    }

    .cardQuestion {
        font-size: 1.5em;
        font-weight: 900;
        width: 80%;
        margin-left: 10%;
        text-shadow: 2px 2px 0px #000000;
        line-height: normal;
        word-break: break-all;
    }
    
    .questionDetails {
        font-size: 2em;
        font-weight: 900;
        width: 80%;
        margin-left: 10%;
        text-shadow: 2px 2px 0px #000000;
        line-height: normal;
        word-break: normal;
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
