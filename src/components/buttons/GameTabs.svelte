<script lang="ts">
    import { push } from "svelte-spa-router";
    import { ethereumAccount } from "../../store/account";
    import contract from "../../store/contract";
    import { solvedRiddles } from "../../store/riddles";
    import getsolvedRiddles from "../../utils/getSolvedRiddles";
    import LeaderBoard from "../LeaderBoard.svelte";
    import Profile from "../Profile.svelte";
    import Riddler from "../Riddler.svelte";


    let selectedTab = 1; // set the default selected tab

    $: activeTab = `Tab ${selectedTab}`; // update the active tab whenever the selected tab changes

    const tabs = ["Solved Riddles", "Solve", "Filter"];

    async function isWalletconnect() {
        if ($ethereumAccount && $ethereumAccount.length) {
            getsolvedRiddles($contract);
           
        } else {
            push("/");
        }
    }
    isWalletconnect();

    if ($solvedRiddles && $solvedRiddles.length) {
        console.log($solvedRiddles)
    }
</script>

<div class="tabs tabs-boxed">
    {#each tabs as tab, i}
        <a
            class="tab"
            class:tab-active={selectedTab === i}
            on:click={() => (selectedTab = i)}>{tab}</a
        >
    {/each}

    <!-- <a class="tab" class:tab-active={selectedTab === 2} on:click={() => selectedTab = 2}>Tab 2</a>
    <a class="tab" class:tab-active={selectedTab === 3} on:click={() => selectedTab = 3}>Tab 3</a> -->
</div>

<div id="spacer" />

{#if ethereumAccount && $ethereumAccount.length}
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                {#if selectedTab === 0}
                    <LeaderBoard />
                {:else if selectedTab === 1}
                    <Riddler />
                {:else if selectedTab === 2}
                    <!-- <RandomRiddle/> -->
                    <Profile />
                {/if}
            </div>
        </div>
    </div>
{:else}{/if}

<!-- {#if riddles} -->
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .tabs {
        position: relative;
        top: 26px;
        background-color: black;
        /* width: 150vw; */
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .tab {
        width: 150px;
        margin-left: 5px;
        margin-right: 5px;
    }
    #spacer {
        height: 10px;
    }
</style>
