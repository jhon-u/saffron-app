import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function Description(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const html = recipeDetails.description

  return (
    <Typography color="black" font='Roboto' variant="body2" dangerouslySetInnerHTML={{
      __html: html}}/>
  );
}