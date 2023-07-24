<!-- <script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import ConnectEthereumWallet from "../components/buttons/ConnectEthereumWallet.svelte";
  import RandomRiddle from "../components/buttons/RandomRiddle.svelte";
  import LeaderBoard from "../components/LeaderBoard.svelte";
  import Riddler from "../components/Riddler.svelte";

  import Construction from "./Construction.svelte";
  import Game from "./Game.svelte";
  import { Contract, ethers } from "ethers";
  const routes = {
    "/game": Game,
    "/construction": Construction,
  };

  import typewriter from "../utils/typewriter";

  import RIDDLER_ABI from "../abi/RIDDLER_ABI";
  import contract from "../store/contract";
  import { activeRiddleIndex, minDepositAmount, riddles, solvedRiddles } from "../store/riddles";

 
 
</script>





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
</style> -->
