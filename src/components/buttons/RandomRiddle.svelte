<script lang="ts">
    import { push } from "svelte-spa-router";
    import {
        activeRiddle,
        riddles,
        activeRiddleIndex,
    } from "../../store/riddles";

    async function getRandomRiddle() {
        if ($riddles && $riddles.length) {
            const unsolvedRiddles = $riddles.filter((obj) =>
                obj.isSolved === false)
            ;

            // console.log(unsolvedRiddles);
            activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
            console.log(activeRiddleIndex)
            while ($riddles[$activeRiddleIndex].isSolved === true) {
                activeRiddleIndex.set(Math.floor(Math.random() * $riddles.length));
            }
            activeRiddle.set($riddles[$activeRiddleIndex]);

            console.log($activeRiddle);
        } else {
            push("/")
        }
    }
</script>

<button
    id="randomButton"
    class="btn btn-primary"
    on:click={async () => getRandomRiddle()}>Get Random Riddle</button
>

<!-- {#if riddles} -->
<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    #randomButton {
        position: absolute;
        top: 80px;
        left: 35%;
    }
</style>
