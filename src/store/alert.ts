import { writable } from "svelte/store";

const alertState = writable<string>("");
const alertMessage = writable<string>("");
const alertLink = writable<string>("");
const isModalOpen = writable<boolean>(false);
export { alertState, alertMessage, alertLink, isModalOpen };