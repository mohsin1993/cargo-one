import { Box, BoxProps, Grid, GridProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GridItem = styled(Grid)<GridProps>({
  display: "grid",
  alignItems: "end",
});

export const BoxGridEnd = styled(Box)<BoxProps>({
  display: "grid",
  alignItems: "end",
});
