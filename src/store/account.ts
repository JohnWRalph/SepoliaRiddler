import { writable } from "svelte/store"; 

const ethereumAccount = writable<string> ();
const ethProvider = writable();
const solanaAccount = writable<string> ();
const isTaiko = writable<boolean> ();
const hasMetamask = writable<boolean> ();
export {ethereumAccount, solanaAccount,ethProvider, isTaiko, hasMetamask};