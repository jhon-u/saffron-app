import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography color="black" font='Roboto' variant="h5">
      <u>{recipeDetails.title}</u>
    </Typography>
  );
}