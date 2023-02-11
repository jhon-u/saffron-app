import React, { useEffect, useContext, useRef, useState } from "react";
import { groceryListContext } from "../Providers/GroceryListProvider";
import GroceryList from "../components/GroceryList";
import { Box, Typography } from "@mui/material";

export default function Groceries(props) {
  const { groceriesToAdd, setGroceriesToAdd} = useContext(groceryListContext)

  return (
    <Box>
      <Typography variant="h4" sx={{mb: 3, color: '#233748'}}>Grocery List</Typography>
      <GroceryList />
    </Box>
  );
}
