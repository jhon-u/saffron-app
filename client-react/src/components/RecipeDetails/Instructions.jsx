import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Grid } from "@mui/material";

export default function Instructions(props) {

  const { recipeDetails } = useContext(recipeDetailsContext)

  const steps = recipeDetails.instructions?.map((step, index) => {
    return <li key={index}>{step}</li>;
  });

  return (
    <Grid item xs={11} md={11} lg={11}>
      <Typography color="black" font='Roboto' variant="h4">
        Instructions
      </Typography>
      <Typography color="black" font='Roboto' variant="body2">
        <ol>{steps}</ol>
      </Typography>
    </Grid>
  );
}