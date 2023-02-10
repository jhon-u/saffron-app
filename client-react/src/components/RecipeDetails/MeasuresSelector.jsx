import {useState, useContext} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { recipeDetailsContext } from '../../Providers/RecipeDetailsProvider';

export default function MeasuresSelector() {
  const { measure, setMeasure } = useContext(recipeDetailsContext);

  const handleChange = (event) => {
    setMeasure(event.target.value);
    console.log(event.target.value)
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Measure</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={measure}
        onChange={handleChange}
        row
      >
        <FormControlLabel value="us" control={<Radio />} label="US" />
        <FormControlLabel value="metric" control={<Radio />} label="Metric" />
      </RadioGroup>
    </FormControl>
  );
}