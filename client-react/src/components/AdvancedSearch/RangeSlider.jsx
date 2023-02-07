import { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";

export default function RangeSlider(props) {
  const [value, setValue] = useState([10, 50]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ m: 1.5, minWidth: "80%" }}>
      <Typography gutterBottom>
        {props.name}: between {value[0]} and {value[1]} {props.unit}
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={props.min}
        max={props.max}
      />
      <Typography variant="caption" gutterBottom>
        {props.caption}
      </Typography>
    </Box>
  );
}
