import { isGoerli } from "../store/account";

async function switchChainToGoerli() {
    try {
        await (window as any).ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x5" }], // chainId must be in hexadecimal numbers
        });
        isGoerli.set(true);
    } catch {
        alert("Please switch to Goerli testnet to continue.");
    }
}

export default switchChainToGoerli;