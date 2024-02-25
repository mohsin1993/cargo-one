import { fireEvent, render, waitFor } from "@testing-library/react";
import { OffersFilters } from "../OffersFilters";
import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

describe("OffersFilters", () => {
  test("works when Loading", async () => {
    const mockCallback = jest.fn((a) => {
      console.log(a);
    });
    const { getByText } = render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <OffersFilters
          filters={{
            originAirportCode: "qqw",
            destAirportCode: "asd",
            dateRange: ["2024-02-24T23:00:00Z", "2024-02-26T23:00:00Z"],
            shipmentWeight: 124,
          }}
          onFiltersChange={mockCallback}
        />
      </LocalizationProvider>
    );

    fireEvent.click(getByText("Search"));

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalled();
    });

    expect(mockCallback).toHaveBeenCalledWith({
      originAirportCode: "qqw",
      destAirportCode: "asd",
      dateRange: ["2024-02-24T23:00:00Z", "2024-02-26T23:00:00Z"],
      shipmentWeight: 124,
    });
  });
});
