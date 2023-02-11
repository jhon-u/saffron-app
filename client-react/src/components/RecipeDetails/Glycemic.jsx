import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Typography } from "@mui/material";

export default function Glycemic(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const glycemicIndex = recipeDetails.nutritionProperties["Glycemic Index"].amount
  const glycemicLoad = recipeDetails.nutritionProperties["Glycemic Load"].amount

  console.log("recipeDetails check", recipeDetails);
  console.log("glycemicindex check", glycemicIndex);

  return (

    <>
    <Typography
          color="black"
          font='Roboto'
          variant="body2"
          fontWeight='light'
          fontSize={16}
          sx={{ textAlign: "justify", textJustify: "inter-word" }}
        >
      <Box>
        Glycemic Index: {glycemicIndex}</Box>
      <Box>Gylcemic Load: {Math.round(glycemicLoad)}</Box>
      </Typography>
    </>

  )
}