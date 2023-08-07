import { ethers } from "ethers";
import { isSepolia } from "../store/account";

async function switchChainToSepolia() {
    try {
        await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    // chainId must be in hexadecimal numbers
                    chainId: "0xaa36a7"
                }
            ],
        });
        isSepolia.set(true);


    } catch (error) {
        console.log(error);
        isSepolia.set(false);
    }
}

export default switchChainToSepolia;