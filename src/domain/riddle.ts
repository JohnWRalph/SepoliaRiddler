export type Riddle = {
    [x: string]: any;
    question: string;
    answer: string;
    isSolved: boolean;
    wrongGuessRewardAmount: number;
    createRiddleRewardAmount: number;
};