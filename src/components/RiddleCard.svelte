<script lang="ts">
    type riddle = {
        question: string;
        answer: string;
        payoutRewardAmount: number;
        solver: string;
        index: number;
    };
    // export let riddleInfo:riddle
    let riddles: riddle[];
    export let question;
    export let answer;
    export let payoutRewardAmount;
    export let solver;
    export let index;
</script>

<div class="card shadow-md bg-primary text-primary-content">
    <div class="cardQuestion">
        {question}
        
    </div>
    <div  class="overflow-x-auto">
        <table style="width:100%;"  class="table table-zebra">
            <!-- head -->

            <tbody style="border-radius:0px;">
                <!-- row 1 -->

                <tr>
                    <td style="width:25%;">Answer</td>
                    <td>{answer}</td>
                </tr>

                <!-- row 2 -->
                <tr>
                    <td>Solver</td>
                    <td>{solver}</td>
                </tr>
                <!-- row 3 -->
                <tr>
                    <td>Reward</td>
                    <td>{payoutRewardAmount}</td>
                </tr>
                <!-- row 4 -->
                <tr>
                    <td>Id</td>
                    <td>{index}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .card {
        display: flex;

        grid-gap: 5px;
        width:600px;
        margin: 0 auto;

        gap: 10px;
        border: 1px solid black;
        box-shadow: 10px 10px 0px 0px #000000;
    }

    .cardQuestion {
        font-size: 1.5em;
        font-weight: 900;
        width: 80%;
        margin-left: 10%;
        text-shadow: 2px 2px 0px #000000;
        line-height: normal;
        word-break: break-all;
    }
 
    @media (min-width: 675px) and (max-width: 900px) {
        .card {
            width: 100%;
        }
    }

    @media (max-width: 675px) {
        .card {
            width: 100%;
        }
    }
</style>
