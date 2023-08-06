import { ethers } from "ethers";
import { isSepolia } from "../store/account";

async function switchChainToSepolia() {
    try {
        await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: "0xaa36a7"



                }
            ],// chainId must be in hexadecimal numbers
        });
        isSepolia.set(true);


    } catch (error) {
        console.log(error);
        //add sepolia network to metamask
        
    
        // isSepolia.set(true);

    }
}

export default switchChainToSepolia;