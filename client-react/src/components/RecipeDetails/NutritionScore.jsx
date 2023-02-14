import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Typography } from "@mui/material";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export default function NutritionScore(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  let nutritionScore = 0;

  if (Object.keys(recipeDetails).length > 0) {
    nutritionScore = recipeDetails?.nutritionProperties["Nutrition Score"].amount
  }

  return (
    <>
      <Typography
        variant="h6"
        letterSpacing={1}
      >
        <SignalCellularAltIcon
          fontSize='large'
          style={{ verticalAlign: "bottom" }}
        /> Nutrition
      </Typography>

      <Box style={{ paddingTop: "10px" }}>
        <Typography
          variant="body2"
          sx={{ textAlign: "justify", textJustify: "inter-word" }}
        >
          Nutrition Score: {Math.round(nutritionScore)}
        </Typography>
      </Box>
    </>
  )
}







