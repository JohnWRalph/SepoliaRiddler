import contract from "../store/contract";
import { solvedRiddles } from "../store/riddles";
// let contract;

async function getsolvedRiddles(contract) {
    console.log(contract);
    const riddleSolvedEvents = await contract.queryFilter(
      "RiddleSolved",
      0,
      "latest"
    );
    solvedRiddles.set(riddleSolvedEvents);
    return riddleSolvedEvents
  }

  export default getsolvedRiddles