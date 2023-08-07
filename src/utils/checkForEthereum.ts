import { hasMetamask } from "../store/account";

async function checkForEthereum(): Promise<boolean> {
    //check if ethereum is injected
    if (!(window as any).ethereum) {
        hasMetamask.set(false);
        return false;
    } else {        
        hasMetamask.set(true);
        return true;
    }
}

export default checkForEthereum;