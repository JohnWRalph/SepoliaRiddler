<script lang="ts">
    import LeaderBoard from "./LeaderBoard.svelte";
    import Profile from "./Profile.svelte";
    import Riddler from "./Riddler.svelte";
    import Create from "./Create.svelte";
    let selectedTab = 0;
    const tabs = [
        "Unsolved",
        "Create",
        "All Solved Riddles",
        "Solved By Address",
    ];
</script>

<div class="tabs tabs-boxed">
    {#each tabs as tab, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
            class="tab"
            class:tab-active={selectedTab === i}
            on:click={() => (selectedTab = i)}>{tab}</a
        >
    {/each}
</div>
<main>
    {#if selectedTab === 0}
        <Riddler />
    {:else if selectedTab === 1}
        <Create />
    {:else if selectedTab === 2}
        <!-- <RandomRiddle/> -->
        <LeaderBoard />
    {:else if selectedTab === 3}
        <Profile />
    {/if}
</main>

<!-- {#if riddles} -->
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .tabs {
        position: relative;
        top: 65px;
        width: 100%;
        height: 60px;
        background-color: black;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-color: white;
        height: 100px;
    }

    .tab {
        width: 20%;
        margin-left: 5px;
        margin-right: 5px;
        border: 1px solid grey;
    }

    main {
        margin-top: 150px;

        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media (max-width: 775px) {
        .tabs {
            top: 120px;
            width: 100vw;
        }
        .tab {
            width: 40%;
        }
    }
</style>
