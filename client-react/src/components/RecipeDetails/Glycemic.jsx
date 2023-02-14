import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Typography } from "@mui/material";

export default function Glycemic(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const glycemicIndex = recipeDetails.nutritionProperties["Glycemic Index"].amount
  const glycemicLoad = recipeDetails.nutritionProperties["Glycemic Load"].amount

  return (
    <>
    <Typography
          variant="body1"
          sx={{ textAlign: "justify", textJustify: "inter-word" }}
        >
      <Box>
        Glycemic Index: {glycemicIndex}</Box>
      <Box>Gylcemic Load: {Math.round(glycemicLoad)}</Box>
      </Typography>
    </>

  )
}