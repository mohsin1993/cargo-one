import { z } from "zod";
import dayjs from "dayjs";

const MaxDaysRange = 10;

export const OffersResponseItem = z.object({
  id: z.string(),
  chargeableWeight: z.number(),
  pickupLocation: z.object({
    country: z.string(),
    code: z.string(),
  }),
  dropoffLocation: z.object({
    country: z.string(),
    code: z.string(),
  }),
  earliestAvailabilityTime: z.string(),
  flightSegments: z.array(
    z.object({
      arrivalTime: z.string(),
      departureTime: z.string(),
      destination: z.string().length(3),
      flightNumber: z.string(),
      origin: z.string().length(3),
    })
  ),
  product: z.object({
    carrier: z.string(),
    logoUrl: z.string(),
  }),
  rank: z.object({
    best: z.number(),
    cheapest: z.number(),
    earliest: z.number(),
  }),
  totalPriceWithOtherCharges: z.object({ amount: z.string(), currency: z.string() }),
});

export const OffersResponse = z.object({ offers: z.array(OffersResponseItem) });

export type OffersResponse = z.infer<typeof OffersResponse>;

export type OffersResponseItem = z.infer<typeof OffersResponseItem>;

const validateDateRange = (dateRange: [string, string]) => {
  const startDate = dayjs(dateRange[0]);
  const endDate = dayjs(dateRange[1]);
  const differenceInDays = endDate.diff(startDate, "day");
  if (differenceInDays < 0) {
    throw new Error("End date cannot be before start date");
  }

  return differenceInDays <= MaxDaysRange;
};

export const OfferFilters = z.object({
  originAirportCode: z.string().length(3, { message: "Please enter 3 letter airport code" }),
  destAirportCode: z.string().length(3, { message: "Please enter 3 letter airport code" }),
  dateRange: z.tuple([z.string().datetime(), z.string().datetime()]).refine(validateDateRange, {
    message: `The duration of the date range should be up to ${MaxDaysRange} days`,
  }),
  shipmentWeight: z.number({ invalid_type_error: "Please enter a number" }).min(0),
});

export type OfferFilters = z.infer<typeof OfferFilters>;
