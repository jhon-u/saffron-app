import { Box } from "@mui/system";
import React, { useEffect, useContext, useRef, useState } from "react";
import { groceryListContext } from "../../Providers/GroceryListProvider";
import ShoppingList from "./ShoppingList";


export default function GroceryList(props) {
  const { groceriesToAdd, setGroceriesToAdd} = useContext(groceryListContext)
  console.log('GROCERY TO ADD', groceriesToAdd)
  
  return (
    <Box>
      <h1>Grocery List</h1>

      <ShoppingList />

    </Box>
  );
}