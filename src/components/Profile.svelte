<script lang="ts">
  import { ethereumAccount } from "../store/account";
  import contract from "../store/contract";
  import { myriddles, riddles, solvedRiddles } from "../store/riddles";
  import getsolvedRiddles from "../utils/getSolvedRiddles";

  // const test =getsolvedRiddles($contract).then((result) => {
  //   console.log(result)
  //  return result

  // })

  // if (test.length) {
  //     console.log(test)
  // } else {

  // }

    // console.log(result);
    // var alter = function (element, account) {
    //   console.log(account);

    //   console.log(element.args.solver === account);
    //   return element.args.solver === account;
    // };
    // var filter = result.filter((element) => alter(element, $ethereumAccount));
    // console.log(filter);
  // });
  let account;
</script>
<input
                                bind:value={account}
                                type="text"
                                placeholder="Enter Eth Addess"
                                class="input input-bordered input-primary w-full max-w-xs"
                            /><br>Check "Solved Riddles" tab for sample addresses
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
      <div class="max-w-md">
          <div class="stack">
              <div class="card shadow-md bg-primary text-primary-content">
                  <div class="card-body">
                    {#if $solvedRiddles}
                    {#each $solvedRiddles as riddle}
                    {#if riddle.args[0] === account}
                      <div id="solvedRiddles">
                      
                        Solver: {riddle.args[0]}<br>
        
                        Answer: {riddle.args.answer}<br>
        
                        Reward (wei):{riddle.args.rewardAmount}
                      </div>
                      <br />
                      {/if}
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



<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .hero {
    display: flex;
    justify-content: center;
  }

  .card {
    padding: 0em;
  }

  #solvedRiddles {
    /* border: 1px solid white; */
    width: 100%;
    margin-top: 10px;
  }
</style>
