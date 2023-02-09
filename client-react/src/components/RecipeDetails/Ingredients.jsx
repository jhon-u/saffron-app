import React, { useState, useEffect, useContext } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Grid, CardMedia, Typography } from "@mui/material";

export default function Ingredients(props) {
  const { recipeDetails, setRecipeDetails } = useContext(recipeDetailsContext);
  console.log("INGREDIENTS", recipeDetails.ingredients);

  const toFraction = (value) => {
    // decimal to fraction
    if (Math.floor(value) == value) return value;
    value = Math.abs(value);
    let ret = 0.01, // rounding error tolerance
      td = value - Math.floor(value), // trailing digits
      r = 1 / td, // reciprocal
      d = r, // start building denominator
      lim = 20; // max loop limit
    for (let i = 0; i < lim; i++) {
      td = r - Math.floor(r);
      if (Math.abs(r - Math.round(r)) < ret) break;
      r = 1 / td;
      d *= r;
    }
    return Math.round(d * value) + "/" + Math.round(d);
  };

  const ingredients = recipeDetails.ingredients?.map((ingredient) => {
    return (
      <Grid key={ingredient.id} container item xs={12} md={6} lg={6}>
        <Grid item xs={1} md={1} lg={1}>
          <CardMedia
            component="img"
            height="24"
            width="24"
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={ingredient.name}
          />
        </Grid>
        <Grid item xs={11} md={11} lg={11}>
          <Typography sx={{m: 1}}>
            <Typography component={"span"} sx={{fontWeight: 'bold'}}>
              {toFraction(ingredient.measures.us.amount)}{" "}
              {ingredient.measures.us.unitLong}
            </Typography>
            {" "}{ingredient.originalName}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  return <> {ingredients}</>;
}
