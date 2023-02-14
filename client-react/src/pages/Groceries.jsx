import React, { useEffect, useContext, useRef, useState } from "react";
import { groceryListContext } from "../Providers/GroceryListProvider";
import GroceryList from "../components/GroceryList";
import { Box, Typography, Grid, CardMedia, Paper } from "@mui/material";
import saffronFlower from '../assets/saffron_flower.png'

export default function Groceries(props) {
  const { groceriesToAdd} = useContext(groceryListContext);
  console.log('groceriesToAdd...', groceriesToAdd)

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, color: "#233748" }}>
        Grocery List
      </Typography>
      {<GroceryList />}
      {!groceriesToAdd.length && <Grid container item xs={12} md={12} lg={12}>
         <Grid item xs={12} md={12} lg={12}>
          <CardMedia
            component="img"
            height="300"
            width="300"
            src={saffronFlower}
            alt={'saffron flower'}
            sx={{ objectFit: "contain" }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h5" textAlign='center' sx={{ mt: 7, color: "#734060" }}>
            Add ingredients to your grocery list from any recipe
          </Typography>
        </Grid>
      </Grid>
      }
    </Box>
  );
}
