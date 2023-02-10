import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box } from "@mui/material";

export default function NutritionScore(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const nutritionScore = recipeDetails.nutritionProperties["Nutrition Score"]?.amount


  return (
    <>
      <h3>Nutrition</h3>
      <Box>Nutrition Score {Math.round(nutritionScore)}</Box>
    </>
  )
}






