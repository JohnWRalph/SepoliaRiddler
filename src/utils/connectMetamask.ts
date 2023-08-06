import { ethers } from "ethers";
import { ethereumAccount, ethProvider, isSepolia } from "../store/account";
import checkChainForSepolia from "./checkChainForSepolia";
import checkForEthereum from "./checkForEthereum";

async function connectMetaMask() {
    if ((await checkForEthereum()) === false) {
        return;
    }
    if ((window as any).ethereum) {
        const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
        );
        ethProvider.set(provider);
        const accounts = await (window as any).ethereum.request({
            method: "eth_requestAccounts",
        });
        ethereumAccount.set(accounts[0]);
    }

    if ((await checkChainForSepolia()) === false) {
        isSepolia.set(false);
        return;
    }
}

export default connectMetaMask;