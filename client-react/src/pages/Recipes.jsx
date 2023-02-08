import React, { useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import AdvancedSearch from "../components/AdvancedSearch";
import { useState, useContext } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";

import { Collapse, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Recipes(props) {
  const [recipeId, setRecipeId] = useState(null);
  const {favourites} = useContext(favouritesContext)
  const getRecipeId = (id) => {
   
    setRecipeId(id);
  };
  console.log("ffavourites check on recipe card", favourites)
  const displayRecipe = props.recipes.results?.map((recipe) => {
    return (
      <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={2}>
        <RecipeCard
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          onClick={getRecipeId}
        />
      </Grid>
    );
  });

  return (
    <Box>
      <Collapse in={props.advSearch} timeout={"auto"}>
        <AdvancedSearch />
      </Collapse>
      <Grid container spacing={2} justify="center">
        {displayRecipe}
      </Grid>
    </Box>
  );
}
