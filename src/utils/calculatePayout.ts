import { payout } from "../store/riddles";

function calculatePayout(riddle, minDepositAmount) {
    const riddleRewardString = riddle.createRiddleRewardAmount.toString()
    const riddleRewardNumber = (Number(riddleRewardString))
    const wrongGuessRewardString = riddle.wrongGuessRewardAmount.toString()
    const wrongGuessRewardNumber = (Number(wrongGuessRewardString))
    const payoutSUM =
        riddleRewardNumber -
        minDepositAmount +
        wrongGuessRewardNumber;
    payout.set(payoutSUM);
}
export { calculatePayout };