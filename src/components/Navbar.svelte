<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Construction from "../pages/Construction.svelte";
    import Game from "../pages/Game.svelte";
  import Home from "../pages/Home.svelte";
  import { ethereumAccount } from "../store/account";
import truncateDescription from "../utils/truncateDescription";
    import GameTabs from "./buttons/GameTabs.svelte";
  // import Profile from "../pages/Profile.svelte";
  // import Register from "../pages/Register.svelte";
  // import UserList from "../pages/UserList.svelte";
  // import { ethereumAccount } from "../store/account";
  const routes = {
    "/": Home,
    "/construction": Construction,
    "/game": Game
  }

//   const text = "Some text here : Proxy<Game> some more text";
// const startIndex = text.indexOf("<") + 1;
// const endIndex = text.indexOf(">");
// const result = text.slice(startIndex, endIndex); 

  // console.log(routes)
  // console.log(routes)
  
</script>

<div id="navbar" class="navbar bg-base-100">
  <div class="dropdown">
    <label tabindex="0" class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        /></svg
      >
    </label>
    <ul
      tabindex="0"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li><a>Homepage</a></li>
      <li><a>Portfolio</a></li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div class="flex-1">
    <!-- <a class="btn btn-ghost normal-case text-xl">
      <button on:click={async () => await push("/")}>THE RIDDLER </button></a
    > -->

    <div id="navDisappear" />
    {#if $ethereumAccount && $ethereumAccount.length}
      Signed in as:  {truncateDescription($ethereumAccount)}
    {:else}{/if}
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
    /* opacity: 0.5; */
    z-index: 100;
  }

  #rightNav {
    /* border:1px solid yellow; */
    /* padding: 10px; */
  }

  
</style>
