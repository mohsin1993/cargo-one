import { useQuery } from "@tanstack/react-query";
import { OfferFilters, OffersResponse } from "../types";
import { fakeFetchData } from "./fetchData";
import { getZodParser } from "./getZodParser";

const OffersKey = "offers";

export const getOffersQueryKey = (filters: OfferFilters | undefined) => [OffersKey, filters];

export const useOffers = (filters: OfferFilters | undefined) => {
  return useQuery({
    queryKey: getOffersQueryKey(filters),
    queryFn: async () =>
      fakeFetchData(`https://fake-offers-api`, { params: filters }).then(
        getZodParser(OffersResponse)
      ),
  });
};
