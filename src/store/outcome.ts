import { writable } from "svelte/store";

export enum Outcome {
    WIN,
    LOSE,
    NOTHING,
}

const outcome = writable<Outcome>(Outcome.NOTHING);

export default outcome;

