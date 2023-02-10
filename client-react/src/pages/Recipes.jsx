import React, { useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import AdvancedSearch from "../components/AdvancedSearch";
import { useState, useContext } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import { searchContext } from "Providers/SearchProvider";

import Spinner from "../components/Spinner";

import { Collapse, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function Recipes(props) {
  const [recipeId, setRecipeId] = useState(null);
  
  
  const {favourites} = useContext(favouritesContext)
  const { searchResults, loading, showSearch } = useContext(searchContext)
  
  const getRecipeId = (id) => {
      setRecipeId(id);
  };
  
  const displayRecipes = (data) => {
    return data?.map((recipe) => {
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
  }


  // const displayRecipe = props.recipes.results?.map((recipe) => {
  //   return (
  //     <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={2}>
  //       <RecipeCard
  //         id={recipe.id}
  //         title={recipe.title}
  //         image={recipe.image}
  //         onClick={getRecipeId}
  //       />
  //     </Grid>
  //   );
  // });

  console.log('SEARCH ', searchResults.length)

  // const renderSearchResults = () => {
  //   if (searchResults.length > 0) {
  //     setShowSearch(true)
  //   } 
  // }

  return (
    <Box>
      <Collapse in={props.advSearch} timeout={"auto"}>
        <AdvancedSearch />
      </Collapse>
      {!loading && <Grid container spacing={2} justify="center">
        { !showSearch && displayRecipes(props.recipes.results) }
        { showSearch && displayRecipes(searchResults) }
      </Grid>}
      {loading &&
        <Box>
          <Spinner />
        </Box>
      }
    </Box>
  );
}
