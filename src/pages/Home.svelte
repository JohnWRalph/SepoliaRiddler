<script lang="ts">
      import Router, { push } from "svelte-spa-router";
    import ConnectEthereumWallet from "../components/buttons/ConnectEthereumWallet.svelte";
    import RandomRiddle from "../components/buttons/RandomRiddle.svelte";
    import LeaderBoard from "../components/LeaderBoard.svelte";
    import Riddler from "../components/Riddler.svelte";
    import { ethereumAccount, ethProvider } from "../store/account";
    import Construction from "./Construction.svelte";
    import Game from "./Game.svelte";

      const routes = {
    "/game": Game,
    "/construction": Construction,
  };

  import typewriter from "../utils/typewriter";
    import { Contract } from "ethers";
    import RIDDLER_ABI from "../abi/RIDDLER_ABI";
    import contract from "../store/contract";
    import { minDepositAmount, riddles } from "../store/riddles";
  async function connect(provider) {
    console.log(provider.getSigner())
    const newContract = new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      RIDDLER_ABI,
      provider.getSigner()
    );
   let allRiddles;
    contract.set(newContract);
    console.log($contract);
    allRiddles = await $contract.getriddles();
    riddles.set(allRiddles);
    console.log($riddles);

    minDepositAmount.set(await $contract.getMinDepositAmount());
    await push("/game")
  }

  // let visible = false;
</script>
<!-- 
<div class="hero min-h-screen bg-base-200">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">welcome to The Riddler</h1>
      <p class="py-6">The Riddler likes to play games. Only the most cunning can solve his puzzles.  Those who do may will be rewarded. Will it be you?</p>
      <button on:click={async () => await push("/game")} class="btn btn-primary">Enter</button>
    </div>
  </div>
</div> -->

<div  class="ascii-art">


████████╗██╗  ██╗███████╗    ██████╗ ██╗██████╗ ██████╗ ██╗     ███████╗██████╗ 
╚══██╔══╝██║  ██║██╔════╝    ██╔══██╗██║██╔══██╗██╔══██╗██║     ██╔════╝██╔══██╗
   ██║   ███████║█████╗      ██████╔╝██║██║  ██║██║  ██║██║     █████╗  ██████╔╝
   ██║   ██╔══██║██╔══╝      ██╔══██╗██║██║  ██║██║  ██║██║     ██╔══╝  ██╔══██╗
   ██║   ██║  ██║███████╗    ██║  ██║██║██████╔╝██████╔╝███████╗███████╗██║  ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
                                                                                

                                                                               
                                                              
  </div>


  <div id="homeText" class="max-w-6/12">

  <p  class="py-6">Solve the riddles and earn a reward.</p>

  </div>

  <div>
  {#if $ethereumAccount && $ethereumAccount.length}
  
   <button on:click={connect($ethProvider)} class="btn btn-primary">Enter the Game</button>
   {:else}
  <ConnectEthereumWallet/>
{/if} 

  

</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .ascii-art {

      margin-top: 100px;
      line-height: 100%;
    font-family: monospace;
    white-space: pre;
    
}

@media only screen and (max-width: 600px) {
    .ascii-art {
        font-size: 6px;
    }
}

#homeText {
    font-size: 24px;
    /* text-align: center; */
    /* border: 1px solid red; */
    /* width:50%; */
    /* margin-left: 25%; */
  }
  </style>
  