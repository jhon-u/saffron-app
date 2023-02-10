import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box } from "@mui/material";

export default function Glycemic(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const glycemicIndex = recipeDetails.nutritionProperties["Glycemic Index"].amount
  const glycemicLoad = recipeDetails.nutritionProperties["Glycemic Load"].amount

  console.log("recipeDetails check", recipeDetails);
  console.log("glycemicindex check", glycemicIndex);

  return (

    <>
      <Box>Glycemic Index {glycemicIndex}</Box>
      <Box>Gylcemic Load {Math.round(glycemicLoad)}</Box>
    </>

  )
}