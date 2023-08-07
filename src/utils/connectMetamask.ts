import { ethers } from "ethers";
import { ethereumAccount, ethProvider, isSepolia } from "../store/account";
import checkChainForSepolia from "./checkChainForSepolia";
import checkForEthereum from "./checkForEthereum";
import switchChainToSepolia from "./switchChainToSepolia";

async function connectMetaMask() {
    //check if ethereum is injected
    if ((await checkForEthereum()) === false) {
        return;
    }
    //set account
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
    //check if Sepolia
    console.log(await checkChainForSepolia());
    if ((await checkChainForSepolia()) === false) {
        console.log()
        //if false, attempt a request to switch to Sepolia
        try {
            switchChainToSepolia();
            isSepolia.set(true);
        } catch (error) {
            console.log(error);
            isSepolia.set(false);
        }
        return;
    } else {
        isSepolia.set(true);
        return;
    }
}

export default connectMetaMask;