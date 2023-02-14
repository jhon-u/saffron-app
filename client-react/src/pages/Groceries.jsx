import React, { useEffect, useContext, useRef, useState } from "react";
import { groceryListContext } from "../Providers/GroceryListProvider";
import GroceryList from "../components/GroceryList";
import { Button, Typography, Grid, CardMedia, Paper } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import saffronFlower from "../assets/saffron_flower.png";

import { useReactToPrint } from 'react-to-print'

export default function Groceries(props) {
  const { groceriesToAdd } = useContext(groceryListContext);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Grid container item xs={12} md={12} lg={12} ref={componentRef}>
      <Grid container item xs={12} md={12} lg={12}>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant="h4" sx={{ mb: 3, color: "#233748" }}>
            Grocery List
          </Typography>
        </Grid>
        <Grid item xs={4} md={4} lg={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={handlePrint}>
            <PrintIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container item xs={12} md={12} lg={12}>
        <GroceryList />
      </Grid>
      
      {!groceriesToAdd.length && (
        <Grid container item xs={12} md={12} lg={12} sx={{height: '60vh'}}>
          <Grid item xs={12} md={12} lg={12}>
            <CardMedia
              component="img"
              height="300"
              width="300"
              src={saffronFlower}
              alt={"saffron flower"}
              sx={{ objectFit: "contain" }}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ mt: 7, color: "#734060" }}
            >
              Add ingredients to your grocery list from any recipe
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
