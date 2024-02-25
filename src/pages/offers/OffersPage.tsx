import { useCallback, useState } from "react";
import { OffersFilters } from "./OffersFilters";
import { useUrlOfferFilters } from "./useUrlFilters";
import { Alert, Box, Button, CircularProgress, Container, Paper } from "@mui/material";
import { getOffersQueryKey, useOffers } from "../../api/useOffers";
import { useQueryClient } from "@tanstack/react-query";
import { OffersList } from "./OffersList";

export const OffersPage = () => {
  const [showUrlFilterError, setShowUrlFilterError] = useState(false);
  const [urlFilters, setUrlOfferFilters] = useUrlOfferFilters(
    useCallback((e: Error) => {
      console.log(e);
      setShowUrlFilterError(true);
    }, [])
  );

  const queryClient = useQueryClient();

  const { isFetching, status, data, error, refetch } = useOffers(urlFilters);

  return (
    <Container maxWidth="lg">
      <Paper sx={{ minHeight: 110, p: { sm: 3, md: 0 } }}>
        {showUrlFilterError && (
          <Alert severity="warning" onClose={() => setShowUrlFilterError(false)} sx={{ mb: 1 }}>
            The filters provided in the URL are invalid. Please make sure all required filters are
            included and have valid values.
          </Alert>
        )}
        <OffersFilters
          isLoading={isFetching}
          filters={urlFilters}
          onFiltersChange={(filters) => {
            // Reset query to get fresh data on every button press
            queryClient.resetQueries({ queryKey: getOffersQueryKey(filters), exact: true });
            setUrlOfferFilters(filters);
          }}
        />
      </Paper>

      <Box>
        {(() => {
          if (isFetching)
            return (
              <Box sx={{ textAlign: "center", paddingTop: 4 }}>
                <CircularProgress />
              </Box>
            );
          if (status === "error")
            return (
              <Alert
                sx={{ mb: 1 }}
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={() => refetch()}>
                    RETRY
                  </Button>
                }
              >
                {error.message}
              </Alert>
            );
          if (status === "success")
            return (
              <Box sx={{ mt: 3 }}>
                <OffersList data={data} />
              </Box>
            );
        })()}
      </Box>
    </Container>
  );
};
