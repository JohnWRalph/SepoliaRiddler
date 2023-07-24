import { hasMetamask } from "../store/account";

async function checkForEthereum(): Promise<boolean> {
    if (!(window as any).ethereum) {
        hasMetamask.set(false);
        return false;
    } else {        
        hasMetamask.set(true);
        return true;
    }
}

export default checkForEthereum;