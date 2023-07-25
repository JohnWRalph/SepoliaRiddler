<script lang="ts">
  import Router, { push } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Construction from "./pages/Construction.svelte";
  import GameTabs from "./components/GameTabs.svelte";
  import Alert from "./components/Alert.svelte";

  const routes = {
    "/": Home,
    "/construction": Construction,
  };
</script>

<Navbar />
<GameTabs />
<Router {routes} />
<Alert />


<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
