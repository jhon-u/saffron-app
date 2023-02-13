import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography 
    color="black" 
    fontFamily='Montserrat' 
    variant="h4"
    letterSpacing={1}
    fontWeight={500}
    fontSize={30}
    textTransform='uppercase'
    >
      {recipeDetails.title}
    </Typography>
  );
}