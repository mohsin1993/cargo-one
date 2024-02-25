import OffersData from "./data/list-of-offers.json";
import { requestStateRandomizer } from "./requestStateRandomizer";

/**
 * Simulates the data fetching process
 */
export const fakeFetchData = async (url: string, options: { params: unknown } = { params: {} }) => {
  console.log(`url: ${url}`);
  console.log(`options: ${options}`);
  await requestStateRandomizer();

  return OffersData;
};
