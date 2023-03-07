<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Construction from "../pages/Construction.svelte";
  import Home from "../pages/Home.svelte";
  import { ethereumAccount } from "../store/account";
  import contract from "../store/contract";
  import { riddles, solvedRiddles } from "../store/riddles";
  import getsolvedRiddles from "../utils/getSolvedRiddles";
  import ConnectEthereumWallet from "./buttons/ConnectEthereumWallet.svelte";
  let selectedTab = 2; // set the default selected tab

  $: activeTab = `Tab ${selectedTab}`; // update the active tab whenever the selected tab changes

  const tabs = ["Top Solvers", "Top ", "Profile"];
  let txHash: string;

  const routes = {
    "/": Home,
    "/construction": Construction,
  };
 

</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
      <div class="max-w-md">
          <div class="stack">
              <div class="card shadow-md bg-primary text-primary-content">
                  <div class="card-body">
                    {#if $solvedRiddles}
                    {#each $solvedRiddles as riddle}
                      <div id="solvedRiddles">
                      
                        Solver: {riddle.args[0]}<br>
        
                        Answer: {riddle.args.answer}<br>
        
                        Reward (wei):{riddle.args.rewardAmount}
                      </div>
                      <br />
                    {:else}{/each}
                  {/if}
                     
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



<br />


<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;


.hero {
  display:flex;
  justify-content: center;
  
} 

.card {
  padding:0em;
}

  #solvedRiddles {
    /* border: 1px solid white; */
    width: 100%;
    margin-top: 10px;
  }

</style>
