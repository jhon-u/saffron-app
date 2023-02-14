import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function Description(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const html = recipeDetails.description

  return (
    <Typography 
    color="black" 
    fontFamily='Montserrat' 
    variant="body2"
    fontWeight={400}
    fontSize={16}
    sx={{ textAlign: "justify", textJustify: "inter-word" }}
    dangerouslySetInnerHTML={{
      __html: html,
    }}
    />
  );
}


