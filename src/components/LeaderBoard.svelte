<script lang="ts">
  import { isLoadingRiddles, solvedRiddles } from "../store/riddles";
</script>

<div class="riddleContainer">
  {#if $solvedRiddles && $solvedRiddles.length}
    {#each $solvedRiddles as riddle}
      <div class="card shadow-md bg-primary text-primary-content">
        <div class="questions">
          <div class="questionDetails">Solver:</div>
          <div style="" class="questionDetails">
            {riddle.args[0]}
          </div>
        </div>
        <div class="questions">
          <div class="questionDetails">
            Question: {riddle.args.question}
          </div>
          <div class="questionDetails">
            Answer: {riddle.args.answer}<br />
          </div>
        </div>

        <div class="questionDetails">
          Reward:{riddle.args.payoutRewardAmount.toNumber()} wei
        </div>
      </div>
    {/each}
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
    <div
      style="display:flex; align-items:center; justify-content:center;"
      class="card shadow-md bg-primary text-primary-content"
    >
      Solved riddles will appear here
    </div>
  {/if}
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .card {
    display: flex;

    grid-gap: 5px;
    max-width: 960px;
    margin: 0 auto;

    gap: 10px;
    border: 1px solid black;
    box-shadow: 10px 10px 0px 0px #000000;
  }
  .riddleContainer {
    display: flex;
    flex-direction: column;

    height: 100%;

    grid-gap: 5px;
    max-width: 960px;
    margin-top: 50px;
    gap: 20px;
    /* border: 1px solid white; */
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
    word-break: break-all;
  }
 
  @media (min-width: 675px) and (max-width: 900px) {
    .riddleContainer {
      width: 600px;
    }
    .card {
      width: 100%;
    }
  }

  @media (max-width: 675px) {
    .riddleContainer {
      width: 90%;
    }
    .card {
      width: 100%;
    }
  }
</style>
