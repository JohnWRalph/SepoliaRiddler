<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import GameTabs from "./components/GameTabs.svelte";
  import Alert from "./components/Alert.svelte";
  import { ethereumAccount } from "./store/account";
    import getRiddlesFromContract from "./utils/getRiddlesFromcontract";

  window.onload = (event) => {
    isConnected();
    getRiddlesFromContract();
  };

  async function isConnected() {
    const accounts = await (window as any).ethereum.request({
      method: "eth_accounts",
    });
    if (accounts.length) {
      ethereumAccount.set(accounts[0]);
    } else {
    }
  }
</script>

<Navbar />
<GameTabs />
<Alert />

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
