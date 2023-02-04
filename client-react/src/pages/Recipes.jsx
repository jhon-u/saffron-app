import React from "react";
import RecipeCard from "../components/RecipeCard";
import { useState } from "react";

export default function Recipes(props) {

  const [recipeId, setRecipeId] = useState(null)

  const getRecipeId = (id) => {
    console.log('RECIPE ID', id)
    setRecipeId(id)
  }
  
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
      <div className="recipeList">{displayRecipe}</div>
  )
}