import type { Contract } from "ethers";
import { writable } from "svelte/store";

const contract = writable<Contract>()

export default contract