<script lang="ts">
  import { ethereumAccount, hasMetamask, isGoerli } from "../store/account";
  import connectMetaMask from "../utils/connectMetamask";
  import switchChainToGoerli from "../utils/switchChainToGoerli";
  import truncateDescription from "../utils/truncateDescription";
</script>

<div id="navbar" class="navbar">
  <div>
    {#if $hasMetamask}
      {#if $ethereumAccount && $ethereumAccount.length && $isGoerli}
        Signed in as: {truncateDescription($ethereumAccount)}
      {:else if !$ethereumAccount}
        <button class="btn btn-primary" on:click={() => connectMetaMask()}
          >Connect Ethereum Wallet</button
        >
      {:else if $ethereumAccount && $ethereumAccount.length}
        <button
          id="switchToGoerliButton"
          class="btn btn-primary"
          on:click={async () => switchChainToGoerli()}
          >Switch chain To Goerli</button
        >
      {/if}
    {:else}
      <button
        class="btn btn-primary"
        on:click={() => window.open("https://metamask.io/download/")}
        >Download Metamask</button
      >
    {/if}
  </div>
  <div class="navbarLinks" style="position:absolute;right:0;gap:10px;">
    <button class="btn navbarButton" style="display:flex; flex-direction:row;">
      <img style="height:100%;" src="etherscan-logo.svg" alt="" />
    </button>
    <button class=" btn navbarButton" style="display:flex; flex-direction:row;">
      <img
        style="height:100%;"
        src="GitHub_Logo_White.png"
        alt=""
      />
      <img
      id="github-mark"
        style="height:100%;"
        src="github-mark-white.svg"
        alt=""
      />
    </button>
  </div>
</div>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  #navbar {
    border: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    background-color: rgb(0, 0, 0);
    z-index: 100;
    border-bottom: 1px solid grey;
    display: flex;
  }

 

  @media (max-width: 775px) {
    #navbar {
      flex-direction: column;
      height: 120px;
      width: 100%;
    }
    .navbarLinks {
      top: 60px;
      right: 50%;
      width: 100%;
      /* transform:translateX(-50%); */
    }
    .navbarButton {
      width: 45%;
      margin-left: 2.5%;
    }
    #github-mark {
      display: none;
    }
    
  }
</style>
