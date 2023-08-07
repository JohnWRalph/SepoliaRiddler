<script lang="ts">
  import { ethereumAccount, hasMetamask, isSepolia } from "../store/account";
  import connectMetaMask from "../utils/connectMetamask";
  import switchChainToSepolia from "../utils/switchChainToSepolia";
  import truncateDescription from "../utils/truncateDescription";
</script>

<div id="navbar" class="navbar">
  <div>
    {#if $hasMetamask}
      {#if $ethereumAccount && $ethereumAccount.length && $isSepolia}
        Signed in as: {truncateDescription($ethereumAccount)}
      {:else if !$ethereumAccount}
        <button class="btn btn-primary" on:click={() => connectMetaMask()}
          >Connect Ethereum Wallet</button
        >
      {:else if $ethereumAccount && $ethereumAccount.length}
        <button
          id="switchToSepoliaButton"
          class="btn btn-primary"
          on:click={async () => switchChainToSepolia()}
          >Switch chain To Sepolia</button
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
    <button
      on:click={() =>
        window.open(
          "https://sepolia.etherscan.io/address/0xa3a5bc1fa0cb074ade3ab94b65cd6efd51411ff0"
        )}
      class="btn navbarButton"
      style="display:flex; flex-direction:row;"
      >View contract
      <img
        style="height:100%; margin-left:5px;"
        src="etherscan-logo-circle.svg"
        alt=""
      />
    </button>
    <button
      on:click={() => window.open("https://github.com/JohnWRalph/SepoliaRiddler")}
      class=" btn navbarButton"
      style="display:flex; flex-direction:row;"
    >
      <img style="height:100%;" src="GitHub_Logo_White.png" alt="" />
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
      width: 100vw;
    }
    .navbarLinks {
      top: 60px;
      right: 50%;
      width: 100%;
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
