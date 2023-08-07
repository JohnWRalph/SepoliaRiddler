import { Contract, ethers } from "ethers"
import RIDDLER_ABI from "../abi/RIDDLER_ABI";

async function getsolvedRiddles(contract): Promise<any> {
  //rpc provider
  const provider = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_SEPOLIA_RPC_URL
  )

  const newContract = new Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    RIDDLER_ABI,
    provider.getSigner()
  )

  const solvedRiddles = await newContract.filters.RiddleSolved()
  const events = await newContract.queryFilter(solvedRiddles, 0, "latest")
  return events
  

}

export default getsolvedRiddles