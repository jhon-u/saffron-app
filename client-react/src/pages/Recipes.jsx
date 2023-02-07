import React, { useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import AdvancedSearch from "../components/AdvancedSearch";
import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import { Box } from "@mui/system";

export default function Recipes(props) {
  const [recipeId, setRecipeId] = useState(null);

  const getRecipeId = (id) => {
    console.log("RECIPE ID", id);
    setRecipeId(id);
  };

  const displayRecipe = props.recipes.results?.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        onClick={getRecipeId}
      />
    );
  });

  return (
    <Box>
      <Collapse in={props.advSearch} timeout={"auto"}>
        <AdvancedSearch />
      </Collapse>
      <div className="recipeList">{displayRecipe}</div>
    </Box>
  );
}
