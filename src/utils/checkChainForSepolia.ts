import { ethers } from "ethers";
import { isSepolia } from "../store/account";

import checkForEthereum from "./checkForEthereum";

async function checkChainForSepolia(): Promise<boolean> {
    // get chain id
    if ((await checkForEthereum()) === false) {
        return false;
    }

    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    const chainId = await provider.getNetwork();
    console.log(chainId);

    if (chainId.chainId === 11155111) {
        isSepolia.set(true);
        return true;
    } else {
        isSepolia.set(false);
        return true;
    }
}

export default checkChainForSepolia;