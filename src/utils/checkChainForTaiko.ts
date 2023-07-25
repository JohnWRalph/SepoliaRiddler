import { ethers } from "ethers";
import { isTaiko } from "../store/account";

import checkForEthereum from "./checkForEthereum";

async function checkChainForTaiko(): Promise<boolean> {
    // get chain id
    if ((await checkForEthereum()) === false) {
        return false;
    }

    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    const chainId = await provider.getNetwork();
    console.log(chainId);

    if (chainId.chainId === 167006) {
        isTaiko.set(true);
        return true;
    } else {
        isTaiko.set(false);
        return true;
    }
}

export default checkChainForTaiko;