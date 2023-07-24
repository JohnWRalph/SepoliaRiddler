import type { BigNumber } from "ethers";
import { derived, writable } from "svelte/store";
import type { Riddle } from "../domain/riddle";

const riddles = writable<Riddle[]>()
const activeRiddle = writable<Riddle>()
const activeRiddleIndex = writable<number>();
const minDepositAmount = writable<number>()
const rewardAmount = writable<BigNumber>()
const solvedRiddles = writable<any[]>()
const unsolvedRiddles = writable<any[]>()
const myriddles = writable<any[]>()
// const solvedRiddles = derived(riddles, ($riddles) => $riddles.filter((riddle) => riddle.isSolved === true));// export const solvedRiddles = derived(riddles_, (riddles_) => sortBy(riddles_, 'isSolved'))
const payout = writable<any>()
const isLoadingRiddles  = writable<boolean>(false)
const createdRiddleIndex = writable<number>()
const createdRiddle = writable<any>()
const modalError = writable<boolean>(false)
const createdAnswer = writable<string>()
const riddleSolvedNotification = writable<boolean>()
const riddleSolvedNotificationText = writable<string>()
export {riddles, activeRiddle, activeRiddleIndex, minDepositAmount, rewardAmount, solvedRiddles, myriddles,payout, isLoadingRiddles, unsolvedRiddles, createdRiddleIndex, createdRiddle,modalError, createdAnswer, riddleSolvedNotification, riddleSolvedNotificationText}