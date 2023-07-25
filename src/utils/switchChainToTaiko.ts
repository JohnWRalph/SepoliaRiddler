import { ethers } from "ethers";
import { isTaiko } from "../store/account";

async function switchChainToTaiko() {
    try {
        await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
                {
                    chainId: "0x28C5E"
                    
                   

                }
            ],// chainId must be in hexadecimal numbers
        });
        isTaiko.set(true);
       

    } catch(error) {
        console.log(error);
        
        await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainId: "0x28C5E",
                    chainName: "Taiko Eldfell L3",
                    nativeCurrency: {
                        name: "ETH",
                        symbol: "ETH",
                        decimals: 18,
                    },
                    rpcUrls: ["https://rpc.l3test.taiko.xyz"],
                    blockExplorerUrls: ["https://explorer.test.taiko.xyz"],

                }
            ]
        });
        isTaiko.set(true);

    }
}

export default switchChainToTaiko;