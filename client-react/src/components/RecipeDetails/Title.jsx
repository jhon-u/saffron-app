import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography 
    variant="h4"
    letterSpacing={1}
    textTransform='uppercase'
    >
      {recipeDetails.title}
    </Typography>
  );
}