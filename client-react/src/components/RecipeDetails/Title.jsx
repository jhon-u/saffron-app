import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography 
    color="black" 
    fontFamily='Roboto' 
    variant="h4"
    letterSpacing={1}
    fontWeight='bold'
    fontSize={30}
    textTransform='uppercase'
    >
      {recipeDetails.title}
    </Typography>
  );
}