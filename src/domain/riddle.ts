export type Riddle = {
    question: string;
    answer: string;
    isSolved: boolean;
    wrongGuessRewardAmount: number;
    createRiddleRewardAmount: number;
};