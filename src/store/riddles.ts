import type { BigNumber } from "ethers";
import { derived, writable } from "svelte/store";
import type { Riddle } from "../domain/riddle";

const riddles = writable<Riddle[]>()
const activeRiddle = writable<Riddle>()
const activeRiddleIndex = writable<number>();
const minDepositAmount = writable<BigNumber>()
const rewardAmount = writable<BigNumber>()
const solvedRiddles = writable<any[]>()
const myriddles = writable<any[]>()
// const solvedRiddles = derived(riddles, ($riddles) => $riddles.filter((riddle) => riddle.isSolved === true));// export const solvedRiddles = derived(riddles_, (riddles_) => sortBy(riddles_, 'isSolved'))

export {riddles, activeRiddle, activeRiddleIndex, minDepositAmount, rewardAmount, solvedRiddles, myriddles}