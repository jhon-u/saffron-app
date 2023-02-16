import { useContext } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Paper, Typography, Grid } from "@mui/material";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function Glycemic(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);

  const GlycemicIndex = () => {
      return recipeDetails.nutritionProperties["Glycemic Index"].amount;
  };

  const GlycemicLoad = () => {
    return Math.round(
      recipeDetails.nutritionProperties["Glycemic Load"].amount
    );
  };

  return (
    <>
      {!loading && (
        <Paper variant="outlined" elevation={0}>
          <Grid container item xs={12} md={12} lg={12} sx={{m: 1}}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h6">Glycemic</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant="body1"
                sx={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                Glycemic Index: {!loading && <GlycemicIndex />}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="body1">
                Gylcemic Load: {!loading && <GlycemicLoad />}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
}
