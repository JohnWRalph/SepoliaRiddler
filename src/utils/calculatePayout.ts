import { payout } from "../store/riddles";

function calculatePayout(riddle, minDepositAmount) {
    //convert initial rweard value from big hex string to number
    const riddleRewardString = riddle.createRiddleRewardAmount.toString()
    const riddleRewardNumber = (Number(riddleRewardString))

    //convert wrong guess reward value from big hex string to number
    const wrongGuessRewardString = riddle.wrongGuessRewardAmount.toString()
    const wrongGuessRewardNumber = (Number(wrongGuessRewardString))

    //sums the rewards
    const payoutSUM =
        riddleRewardNumber -
        minDepositAmount +
        wrongGuessRewardNumber;
    payout.set(payoutSUM);
}
export { calculatePayout };