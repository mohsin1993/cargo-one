import { render, waitFor } from "@testing-library/react";
import { OffersList } from "../OffersList";
import "@testing-library/jest-dom";
import data from "./data.json";

describe("OffersFilters", () => {
  test("works when Loading", async () => {
    const { getByTestId } = render(<OffersList data={data} />);

    await waitFor(() => {
      expect(getByTestId("offers-list").children.length).toBe(3);
    });
  });
});
