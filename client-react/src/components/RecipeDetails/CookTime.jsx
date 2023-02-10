import React from "react";
import { Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function CookTime(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography color="rgba(25,118,210,255)" font='Roboto' variant="body2">
      <AccessTimeIcon />Ready in: <b>{recipeDetails.time}</b> minutes
    </Typography>
  );
}