<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Construction from "./pages/Construction.svelte";
    import Game from "./pages/Game.svelte";
    import Riddler from "./components/Riddler.svelte";
    import GameTabs from "./components/buttons/GameTabs.svelte";
    
  const routes = {
    "/": Home,
    "/construction": Construction,
    "/game": Game
  }
//   const text = "Some text here : Proxy<Game> some more text";
// const startIndex = text.indexOf("<") + 1;
// const endIndex = text.indexOf(">");
// const result = text.slice(startIndex, endIndex); // "Game"

  // console.log(routes)
  // console.log(routes["/game"].name)
// console.log(window.location.hash)
</script>
<Navbar/>
<!-- {#if window.location.hash === "#/"}
<GameTabs/>{:else}hhhghgh{/if} -->
<main>
<!-- <div id="spacer"></div> -->

<Router {routes}/>
  

</main>
<Footer/>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
main {
  margin-top:38px;
  margin-bottom: 100px;
  min-height:100vh;
  width:100vw;
  
}


</style>