import { ethers } from "ethers";
import { isGoerli } from "../store/account";
import checkForEthereum from "./checkForEthereum";

async function checkChainForGoerli(): Promise<boolean> {
    //get chain id
    if ((await checkForEthereum()) === false) {
        return false;
    }

    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    const chainId = await provider.getNetwork();
    console.log(chainId);

    if (chainId.chainId === 5) {
        isGoerli.set(true);
        return true;
    } else {
        isGoerli.set(false);
        return false;
    }
}

export default checkChainForGoerli;