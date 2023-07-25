<script lang="ts">
  import { BigNumber } from "ethers";
  import { solvedRiddles } from "../store/riddles";
  import RiddleCard from "./RiddleCard.svelte";
  import truncateDescription from "../utils/truncateDescription";
  let account;
</script>

<div class="card shadow-md bg-primary text-primary-content addressLookupCard">
  <h1
    id="ethAddressLookup"
    class="questionDetails"
    style="margin-left:0;margin-bottom:20px; word-break:break-word;"
  >
    Lookup Solved Riddles By Address
  </h1>
  <input
    bind:value={account}
    type="text"
    placeholder="Enter Eth Addess"
    class="input input-bordered input-primary w-full max-w-xs"
  /><h2 style="font-size:1.5rem;" class="questionDetails">Try: "0x9552cfce60429863D4A7D8205457EC4AC05857dC"</h2>  <div class="riddleContainer" />

  {#if $solvedRiddles && $solvedRiddles.length}
    {#each $solvedRiddles as riddle}
      {#if riddle.args[0] === account}
        <RiddleCard
          question={riddle.args.question}
          answer={riddle.args.answer}
          payoutRewardAmount={riddle.args.payoutRewardAmount.toNumber()}
          solver={truncateDescription(riddle.args[0])}
          index={riddle.args.index}
        />
      {/if}
    {/each}
  {:else}
    <div
      style="display:flex; align-items:center; justify-content:center;"
      class="card shadow-md bg-primary text-primary-content"
    >
      Solved riddles will appear here
    </div>
  {/if}
</div>

<br />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .card {
    display: flex;

    grid-gap: 5px;
    max-width: 960px;
    margin: 0 auto;
    width: 90%;
    gap: 10px;
    border: 1px solid black;
    /* //shadow bottom right */
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
.addressLookupCard{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
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

  #ethAddressLookup {
    margin-top: 50px;
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
