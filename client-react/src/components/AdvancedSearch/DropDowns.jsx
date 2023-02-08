import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useContext } from "react";
import { searchContext } from "Providers/SearchProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, option, theme) {
  return {
    fontWeight:
      option.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



export default function DropDowns(props) {
const { setDiet, setIntolerances } = useContext(searchContext);

  const theme = useTheme();
  const [option, setOption] = React.useState([]);

  const handleChange = (event, name) => {
    const {
      target: { value },
    } = event;

    if (name === "Diets") {
      setDiet( typeof value === 'string' ? value.split(',') : value )
    }
    if (name === "Intolerances") {
      setIntolerances( typeof value === 'string' ? value.split(',') : value )
    }
    setOption(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
   

  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '90%' }}>
        <InputLabel id="demo-multiple-chip-label">{props.name}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={option}
          onChange={(event) => handleChange(event, props.name)}
          input={<OutlinedInput id="select-multiple-chip" label={props.name} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.data.map((value) => (
            <MenuItem
              key={value}
              value={value}
              style={getStyles(value, option, theme)}
            >
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}