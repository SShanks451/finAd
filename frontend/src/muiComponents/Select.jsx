import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels() {
  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 120, borderRadius: "1rem" }} size="small">
        <Select sx={{ borderWidth: "1px", color: "white" }} displayEmpty inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value={1}>Male</MenuItem>
          <MenuItem value={2}>Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
