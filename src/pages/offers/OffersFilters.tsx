import { Box, Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { stringToNumber } from "../../utils/stringToNumber";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import Calendar from "@mui/icons-material/Event";
import dayjs from "dayjs";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro";
import { OfferFilters } from "../../types";

type Props = {
  filters: OfferFilters | undefined;
  onFiltersChange: (newFilters: OfferFilters) => void;
  isLoading?: boolean;
};

export const OffersFilters: FC<Props> = ({ filters, onFiltersChange, isLoading }) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<OfferFilters>({
    resolver: zodResolver(OfferFilters),
    mode: "onChange",
    defaultValues: filters,
  });

  const originAirportCodeField = register("originAirportCode");
  const destAirportCodeField = register("destAirportCode");
  const shipmentWeightField = register("shipmentWeight", { setValueAs: stringToNumber });

  return (
    <Box>
      <form
        onSubmit={handleSubmit(() => {
          onFiltersChange(getValues());
        })}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={12} md={2}>
            <TextField
              label="Origin Airport Code"
              type="string"
              inputProps={{ style: { textTransform: "uppercase" } }}
              {...originAirportCodeField}
              fullWidth
              placeholder="e.g CAI, LAX, MAD"
              error={!!errors.originAirportCode}
              helperText={errors.originAirportCode?.message}
              size="small"
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <TextField
              label="Destination Airport Code"
              type="string"
              inputProps={{ style: { textTransform: "uppercase" } }}
              {...destAirportCodeField}
              fullWidth
              placeholder="e.g CAI, LAX, MAD"
              error={!!errors.destAirportCode}
              helperText={errors.destAirportCode?.message}
              size="small"
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <TextField
              label="Weight of shipment"
              type="string"
              {...shipmentWeightField}
              fullWidth
              helperText={errors.shipmentWeight?.message}
              error={!!errors.shipmentWeight}
              size="small"
              disabled={isLoading}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Controller
              control={control}
              name="dateRange"
              render={({ field }) => (
                <DateRangePicker
                  {...field}
                  label="Date Range"
                  slotProps={{
                    textField: {
                      size: "small",
                      sx: { display: "flex" },
                      helperText: errors.dateRange?.message,
                      error: !!errors.dateRange,
                      disabled: isLoading,
                      InputProps: { endAdornment: <Calendar color="action" /> },
                    },
                  }}
                  minDate={dayjs()}
                  slots={{ field: SingleInputDateRangeField }}
                  name="dateRange"
                  value={
                    field.value ? [dayjs(field.value[0]), dayjs(field.value[1])] : [null, null]
                  }
                  onChange={(value) => {
                    setValue(
                      "dateRange",
                      [dayjs(value[0]).utc().format(), dayjs(value[1]).utc().format()],
                      { shouldValidate: true }
                    );
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md="auto">
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
