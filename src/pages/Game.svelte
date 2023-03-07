<script lang="ts">
    import { push } from "svelte-spa-router";
    import ConnectEthereumWallet from "../components/buttons/ConnectEthereumWallet.svelte";
    import GameTabs from "../components/buttons/GameTabs.svelte";
    import RandomRiddle from "../components/buttons/RandomRiddle.svelte";
    import LeaderBoard from "../components/LeaderBoard.svelte";
    import Riddler from "../components/Riddler.svelte";
    import { ethereumAccount } from "../store/account";

    // console.log(guessLength);
function isWalletconnect() {
    if ($ethereumAccount && $ethereumAccount.length) {

    } else {
        push("/")
    }
}
    isWalletconnect()
</script>
{#if $ethereumAccount && $ethereumAccount.length}
    <GameTabs/>
    {:else}
    <!-- <ConnectEthereumWallet/> -->
    {/if}
<div id='gamePage'>

    <!-- <Riddler /> -->
</div>




<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

   #gamePage{
    position: relative;
    top:0px;
    display:flex;
    flex-direction: column;
   }
</style>
