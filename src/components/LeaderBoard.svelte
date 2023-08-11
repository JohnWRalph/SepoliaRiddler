<script lang="ts">
  import { isLoadingRiddles, solvedRiddles } from "../store/riddles";
    import getsolvedRiddles from "../utils/getSolvedRiddles";
    import truncateDescription from "../utils/truncateDescription";
    import RiddleCard from "./RiddleCard.svelte";

    getsolvedRiddles(import.meta.env.VITE_CONTRACT_ADDRESS);
</script>

<div class="riddleContainer">
  {#if $solvedRiddles && $solvedRiddles.length}
    {#each $solvedRiddles as riddle}
    <RiddleCard question={riddle.args.question}
    answer={riddle.args.answer}
    payoutRewardAmount={riddle.args.payoutRewardAmount}
    solver={truncateDescription(riddle.args[0])}
    index={riddle.args.index}
    />
     
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
   width:100%;
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

    margin-bottom:50px;
    gap: 20px;
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
