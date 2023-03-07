import { ethers } from "ethers";
import { ethereumAccount, ethProvider } from "../store/account";

type EthereumWindow = {
  // todo: get rid of typing
  ethereum: any;
};

async function connectMetaMask() {
  // connectMetaMaskButton.disabled = true;
    const provider = new ethers.providers.Web3Provider(
      (window as any as EthereumWindow).ethereum
    );
    const walletAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {}
        }
      ]
    });

    const accounts = await provider.send("eth_requestAccounts", []);
    // console.log(provider.send("eth_requestAccounts", []));
    const providedAccount = accounts[0];
    ethereumAccount.set(providedAccount)
    ethProvider.set(provider)
    // ethereumAccount.set(providedAccount);
    return provider;
 
}

export default connectMetaMask;
