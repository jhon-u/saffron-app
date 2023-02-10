import React from "react";
import { Typography } from "@mui/material"
import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography color="rgba(25,118,210,255)" font='Roboto' variant="h5">
      <u>{recipeDetails.title}</u>
    </Typography>
  );
}