import { writable } from "svelte/store";

const alertState = writable<string>("");
const alertMessage = writable<string>("");
const alertLink = writable<string>("");
export { alertState, alertMessage, alertLink };