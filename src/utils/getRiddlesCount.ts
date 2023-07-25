import { Contract, ethers } from "ethers";
import RIDDLER_ABI from "../abi/RIDDLER_ABI";
import { setAlert } from "./setAlert";

async function getRiddlesLength() {
    const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
    );
    if (!provider) {
        setAlert("error", "No provider detected");
        return;
    }
    const contract = new Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        RIDDLER_ABI,
        provider.getSigner()
    );
    if (!contract) {
        setAlert("error", "Error connecting with contract");
        return;
    }
    const riddlesLength = await contract.getRiddlesLength();
    return riddlesLength;
}

export default getRiddlesLength;