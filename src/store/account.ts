import { writable } from "svelte/store"; 

const ethereumAccount = writable<string> ();
const ethProvider = writable();
const solanaAccount = writable<string> ();

export {ethereumAccount, solanaAccount,ethProvider};