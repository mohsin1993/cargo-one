import { FC } from "react";
import { OffersResponseItem } from "../../../types";
import { Box, Chip, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { GridItem } from "./styles";

type Props = { offer: OffersResponseItem };

export const Offer: FC<Props> = ({ offer }) => {
  const { flightSegments, rank } = offer;

  // shows Non Stop or e.g 2 Stops (FAR,BER)
  const stopsText = (() => {
    if (flightSegments.length === 2) return `Non Stop`;

    const midFlights = flightSegments.slice(1, -1);
    return `${flightSegments.length - 2} Stops (${midFlights.map((flight) => flight.origin)})`;
  })();

  const chipConfig = (() => {
    if (rank.best === 1) return { color: "primary", label: "Best" } as const;
    else if (rank.earliest === 1) return { color: "success", label: "Earliest" } as const;
    else if (rank.cheapest === 1) return { color: "info", label: "Cheapest" } as const;
    return;
  })();

  return (
    <Paper sx={{ padding: 2, position: "relative" }}>
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        {chipConfig && (
          <Chip
            label={chipConfig.label}
            size="small"
            sx={{ minWidth: 70 }}
            color={chipConfig.color}
          />
        )}
      </Box>
      <Grid container justifyContent="space-between">
        <GridItem item md={2} sm={12} xs={12} sx={{ justifyItems: "start" }}>
          <Box
            src={offer.product.logoUrl}
            component="img"
            alt={`${offer.product.carrier} logo`}
            sx={{
              height: 50,
              width: "auto",
            }}
          />
          <Typography variant="subtitle1" sx={{ mb: 0 }} noWrap>
            {offer.product.carrier}
          </Typography>
        </GridItem>
        <GridItem item md={8} sm={12} xs={12}>
          <Grid container sx={{ flex: 1 }} justifyContent="center">
            <GridItem item xs={4} sx={{ justifyItems: "center" }}>
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {dayjs(flightSegments[0].departureTime).format("MMM D, h:mm A")}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {flightSegments[0].origin}
              </Typography>
            </GridItem>
            <GridItem item xs={4} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle1" noWrap>
                {stopsText}
              </Typography>
            </GridItem>
            <GridItem
              item
              xs={4}
              sx={{
                justifyItems: "center",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {dayjs(flightSegments[flightSegments.length - 1].arrivalTime).format(
                  "MMM D, h:mm A"
                )}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {flightSegments[flightSegments.length - 1].destination}
              </Typography>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem item md={2} sm={12} xs={12}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0 }} fontWeight="bold" noWrap>
              {`${offer.totalPriceWithOtherCharges.amount} ${offer.totalPriceWithOtherCharges.currency}`}
            </Typography>
            <Typography variant="subtitle1" noWrap>
              Total amount
            </Typography>
          </Box>
        </GridItem>
      </Grid>
    </Paper>
  );
};
