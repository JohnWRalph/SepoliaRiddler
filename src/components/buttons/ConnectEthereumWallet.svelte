<script lang="ts">
  import { Contract } from "ethers";
  import RIDDLER_ABI from "../../abi/RIDDLER_ABI";
  import type { Riddle } from "../../domain/riddle";
  import { ethereumAccount, solanaAccount } from "../../store/account";
  import contract from "../../store/contract";
  import { riddles, minDepositAmount, rewardAmount } from "../../store/riddles";
  import connectMetaMask from "../../utils/connectMetaMask";

  let allRiddles: Riddle[];

async function connect(provider) {
    console.log(provider.getSigner())
    const newContract = new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      RIDDLER_ABI,
      provider.getSigner()
    );
   
    contract.set(newContract);
    console.log($contract);
    allRiddles = await $contract.getriddles();
    riddles.set(allRiddles);
    console.log($riddles);
    minDepositAmount.set(await $contract.getMinDepositAmount());
  }
</script>

<button
  id="connectMetaMaskButton"
  class="connectWalletButton btn btn-primary"
  on:click={async () => {
    await connectMetaMask();
  }}>Connect Wallet</button
>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  .connectWalletButton {
    width: 200px;
    margin: 10px;
  }
  #connectMetaMaskButton {
    /* position:absolute; */
    /* top:70px; */
    /* right:35% */
  }
</style>
