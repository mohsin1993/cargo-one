import { Box } from "@mui/material";
import { OffersResponse } from "../../types";
import { Offer } from "./Offer/Offer";
import { FC } from "react";

type Props = { data: OffersResponse };

export const OffersList: FC<Props> = ({ data }) => {
  return (
    <Box data-testid="offers-list">
      {data.offers.map((offer) => (
        <Box key={offer.id} mb={2}>
          <Offer offer={offer} />
        </Box>
      ))}
    </Box>
  );
};
