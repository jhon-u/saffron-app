import { useState, useContext } from "react";
import { Button } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function AddToGroceriesBtn() {
  const { ingredients } = useContext(recipeDetailsContext);

  const handleClick = (event) => {
    console.log('INGREDIENTS', ingredients);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
    >
      Add to Groceries
    </Button>
  );
}
