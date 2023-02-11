import { useState, useContext } from "react";
import { Box, Button } from "@mui/material";

import ModalList from "../GroceryList/ModalList";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function AddToGroceriesBtn() {
  const { ingredients, setOpenGroceriesModal } =
    useContext(recipeDetailsContext);

  const handleClick = (event) => {
    console.log('INGREDIENTS AT AddToGroceriesBtn', ingredients)
    setOpenGroceriesModal(true);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Add to Groceries
      </Button>
      <ModalList />
    </Box>
  );
}
