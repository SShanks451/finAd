import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({ label, onChange = () => {}, disabled = false, value = "" }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "35ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id={label} value={value} label={label} variant="outlined" size="small" onChange={onChange} disabled={disabled} />
    </Box>
  );
}
