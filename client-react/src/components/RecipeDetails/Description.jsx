import React from "react";
import { Typography } from "@mui/material"
import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function Description(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const html = recipeDetails.description

  return (
    <Typography color="rgba(25,118,210,255)" font='Roboto' variant="body2">
      <div dangerouslySetInnerHTML={{
        __html: html,
      }}/>
    </Typography>
  );
}