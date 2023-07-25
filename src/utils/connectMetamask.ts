import { ethers } from "ethers";
import { ethereumAccount, ethProvider, isTaiko } from "../store/account";
import checkChainForTaiko from "./checkChainForTaiko";
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

    if ((await checkChainForTaiko()) === false) {
        isTaiko.set(false);
        return;
    }
}

export default connectMetaMask;