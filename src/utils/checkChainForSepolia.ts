import { ethers } from "ethers";
import { isSepolia } from "../store/account";
import checkForEthereum from "./checkForEthereum";

async function checkChainForSepolia(): Promise<boolean> {
    //check if ethereum
    if ((await checkForEthereum()) === false) {
        return false;
    }
    //get provider
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    //get network
    const chainId = await provider.getNetwork();
    //check if Sepolia
    if (chainId.chainId === 11155111) {
        isSepolia.set(true);
        return true;
    } else {
        isSepolia.set(false);
        return false;
    }
}

export default checkChainForSepolia;