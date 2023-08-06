import { writable } from "svelte/store";

const ethereumAccount = writable<string>();
const ethProvider = writable();
const solanaAccount = writable<string>();
const isSepolia = writable<boolean>();
const hasMetamask = writable<boolean>();
export { ethereumAccount, solanaAccount, ethProvider, isSepolia, hasMetamask };