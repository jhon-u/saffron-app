import { useContext } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Paper, Typography, Grid } from "@mui/material";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

export default function NutritionScore(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);

  let nutritionScore = 0;

  if (Object.keys(recipeDetails).length > 0) {
    nutritionScore =
      recipeDetails?.nutritionProperties["Nutrition Score"].amount;
  }

  return (
    <Paper variant="outlined" elevation={0}>
      <Grid container item xs={12} md={12} lg={12} sx={{ m: 1 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant="h6" letterSpacing={1}>
            <SignalCellularAltIcon
              fontSize="large"
              sx={{ verticalAlign: "bottom" }}
            />
            Nutrition
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="body2"
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            Nutrition Score: {Math.round(nutritionScore)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
