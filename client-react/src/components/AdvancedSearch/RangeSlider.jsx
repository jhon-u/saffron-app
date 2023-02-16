import { useState } from "react";
import { Slider, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { searchContext } from "Providers/SearchProvider";

export default function RangeSlider(props) {
  const {carbs, setCarbs, setFat, setProtein} = useContext(searchContext)
  const [value, setValue] = useState(carbs);

  const handleChange = (event, newValue) => {
    if (props.name === "Protein") {
      setProtein(newValue)
    }
    if (props.name === "Fat") {
      setFat(newValue)
    }
    if (props.name === "Carbs") {
      setCarbs(newValue)
    }
    setValue(newValue);
  };

  return (
    <Box sx={{ m: 1.5, minWidth: "80%" }}>
      <Typography gutterBottom>
        {props.name}: between {value[0]} and {value[1]} {props.unit}
      </Typography>
      <Slider
        size="small"
        getAriaLabel={() => "range"}
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
