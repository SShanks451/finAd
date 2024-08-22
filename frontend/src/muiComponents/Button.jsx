import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";

export default function BasicButtons({ label, width, paddingY = 1.25, onClick = () => {}, isDisable = false }) {
  const theme = createTheme({
    palette: {
      gray: {
        main: "#b9bdba",
        light: "#6d706e",
        dark: "#6d706e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button sx={{ width: width, paddingY: paddingY }} disabled={isDisable} variant="contained" color="gray" onClick={onClick}>
        {label}
      </Button>
    </ThemeProvider>
  );
}
