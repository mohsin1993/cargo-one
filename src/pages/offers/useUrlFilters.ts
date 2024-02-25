import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { OfferFilters } from "../../types";

/**
 * Keeps filters state in sync with the url search params
 * @param onError called when filters provided in url are invalid
 */
export const useUrlOfferFilters = (onError?: (e: Error) => void) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFilters = React.useMemo(() => {
    let parsedDate: OfferFilters | undefined;

    if (searchParams?.get("filters")) {
      try {
        const parsedFilters = JSON.parse(decodeURIComponent(searchParams.get("filters")!));
        parsedDate = OfferFilters.parse(parsedFilters);
      } catch (e) {
        onError?.(e as Error);
      }
    }
    return parsedDate;
  }, [searchParams, onError]);

  const setUrlOfferFilters = useCallback(
    (newFilters: OfferFilters) => {
      const filtersString = encodeURIComponent(JSON.stringify(newFilters));
      setSearchParams(new URLSearchParams([["filters", filtersString]]));
    },
    [setSearchParams]
  );

  return [urlFilters, setUrlOfferFilters] as const;
};
