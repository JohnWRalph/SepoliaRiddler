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

    let outcome: Outcome = Outcome.NOTHING;

    async function submitGuess() {
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
        const guessString = guess.join("");
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
            alert("Please connect your wallet to submit a guess.");
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
            const tx = await contract.guess($activeRiddleIndex, guessString, {
                value: $minDepositAmount,
            });

            txHash = tx.hash;
            const receipt = await tx.wait(1);
            (receipt.events || []).find((event) => {
                if (event.event === "RiddleSolved") {
                    outcome = Outcome.WIN;
                    setAlert(
                        "success",
                        "You won! The answer was " + guess,
                        "https://goerli.etherscan.io/tx/" + txHash
                    );
                    riddleSolvedNotification.set(true);
                    riddleSolvedNotificationText.set(
                        "You won! The answer was " + guess+". view on etherscan: https://goerli.etherscan.io/tx/" + txHash
                    );
                    setTimeout(() => {
                        try {
                            button = document.getElementById(
                                "submitGuessButton"
                            ) as HTMLButtonElement;

                            button.innerHTML = "Riddle Solved";
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
                setAlert(
                    "error",
                    "You rejected the transaction"
                    
                );
            }
            button.innerHTML = "Submit Answer";
            button.classList.remove("btn-disabled");
        }
    }
    async function getRandomRiddle() {
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
        let provider;
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
            // const payoutSUM =
            //     $activeRiddle.createRiddleRewardAmount -
            //     $minDepositAmount +
            //     $activeRiddle.wrongGuessRewardAmount;
            // payout.set(payoutSUM);
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
            const riddle = await newContract.getRiddleByIndex(riddleIndex);
            activeRiddle.set(riddle);
            activeRiddleIndex.set(index);
            calculatePayout(riddle, $minDepositAmount);
        }
    }
    let riddleIndex: number;
</script>
<img loading="lazy" class="riddlerImage" src="src/assets/Riddler.png" alt="" />


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
            <div class="questions">
                <div class="questionDetails">
                    Riddle ID: {$activeRiddle.index}
                </div>
                <div style="word-break:break-all" class="questionDetails">
                    Creator: {$activeRiddle.creator}
                </div>
            </div>
            <div class="questions">
                <div class="questionDetails">
                    Question: {$activeRiddle.question}
                </div>
            </div>

            <div class="questionDetails">
                Initial Reward Amount: {$activeRiddle.createRiddleRewardAmount} wei<br
                />
                Previous Wrong Guesses Pool + {$activeRiddle.wrongGuessRewardAmount}
                wei<br />
                Guess Cost: -{$minDepositAmount} wei<br />
                Payout Amount: (wei): {$payout}
            </div>
            <div id="submitGuess">
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
    <p class="questionDetails" style="word-break:break-word">{$riddleSolvedNotificationText}</p>
    {:else if $riddleSolvedNotification === false}
    <p class="questionDetails"  style="word-break:break-word">{$riddleSolvedNotificationText}</p>
    {/if}

</div>

<br />

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .input {
    }

    #submitGuess {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-disabled {
        background-color: #6b7280;
        cursor: not-allowed;
        color: black;
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
.riddlerImage{
    position:relative;
    top:0px;
    margin-left:20px;
    margin-right:20px;
    min-height: 135px;
}
    .questions {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid black;
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
            width: 100%;
        }
    }

    @media (max-width: 675px) {
        .card {
            width: 100%;
        }
        .ascii-art{
            /* width:350px; */
            /* top:50px; */
            /* top:-120px; */
            font-size: 0.5em;
            line-height: 0.95em;

        }
        .riddlerImage{
            width:90%;
        }
        #homeText{
            /* margin-top:-120px; */
        }
    }
</style>
