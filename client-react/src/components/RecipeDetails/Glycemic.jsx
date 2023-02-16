import { useContext } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Typography, Grid } from "@mui/material";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function Glycemic(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);

  // const glycemicIndex = recipeDetails.nutritionProperties["Glycemic Index"].amount
  // const glycemicLoad = recipeDetails.nutritionProperties["Glycemic Load"].amount

  

  return (
    <>
      {!loading && (
        <Box>
          <Grid container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="h6">Glycemic</Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant="body1"
                sx={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                Glycemic Index:{" "}
                {recipeDetails.nutritionProperties["Glycemic Index"].amount}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Typography variant="body1">
                Gylcemic Load:{" "}
                {Math.round(
                  recipeDetails.nutritionProperties["Glycemic Load"].amount
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
