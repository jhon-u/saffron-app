import React from "react";
import RecipeCard from "../components/RecipeCard";

export default function Recipes(props) {
  
  const displayRecipe = props.recipes.results?.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
      />
    );
  });

  return (
      <div className="recipeList">{displayRecipe}</div>
  )
}