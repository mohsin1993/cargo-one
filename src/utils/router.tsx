import { createBrowserRouter } from "react-router-dom";
import { OffersPage } from "../pages/offers/OffersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OffersPage />,
  },
]);
