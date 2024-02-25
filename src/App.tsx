import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";

export default function App() {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalAirportIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
              }}
            >
              Cargo Booking
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <RouterProvider router={router} />
        </Box>
      </Container>
    </Box>
  );
}
