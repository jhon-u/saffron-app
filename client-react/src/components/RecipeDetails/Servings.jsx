import { useState, useContext, useEffect } from "react";
import { Container, ButtonGroup, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blueGrey[50]),
  backgroundColor: '#734060',
  borderColor: '#734060',
  color: '#FFFFFF',
  "&:hover": {
    backgroundColor: '#A87193',
    borderColor: '#A87193'
  }
}));

const StyledInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 0,
      borderColor: '#734060'
    },
    "&:hover fieldset": {
      borderColor: '#734060'
    },
    "&.Mui-focused fieldset": {
      borderColor: '#734060'
    },
    "& input": {
      textAlign: "center",
      width: 30,
      color: '#734060'
    }
  }
});

export default function Servings() {
  const { servings, setServings } = useContext(recipeDetailsContext);

  const handleChange = (event) => {
    setServings(Math.max(Number(event.target.value), 1));
  };

  const removeServing = () => {
    setServings((prev) => prev - 1)
  }

  const addServing = () => {
    setServings((prev) => prev + 1)
  }

  return (
    <Container sx={{display: 'flex', alignItems: 'center'}}>
      <ButtonGroup>
        <StyledButton
          onClick={removeServing}
          disabled={servings === 1}
        >
          <RemoveIcon fontSize="small" />
        </StyledButton>
        <StyledInput size="small" onChange={handleChange} value={servings} />
        <StyledButton onClick={addServing}>
          <AddIcon fontSize="small" />
        </StyledButton>
      </ButtonGroup>
      <Typography component={'span'} variant="body" sx={{ml: 2}}>Servings</Typography>
    </Container>
  );
}
