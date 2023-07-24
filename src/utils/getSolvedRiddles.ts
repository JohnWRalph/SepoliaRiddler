async function getsolvedRiddles(contract): Promise<any> {
  const solvedRiddles = contract.filters.RiddleSolved()
  const events = await contract.queryFilter(solvedRiddles, 0, "latest");
  return events;
}

export default getsolvedRiddles