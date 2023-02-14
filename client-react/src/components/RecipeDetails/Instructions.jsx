import { React, useContext } from "react";
import { Typography } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Grid, Box } from "@mui/material";

export default function Instructions(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);

  const steps = recipeDetails.instructions?.map((step, index) => {
    return (
      <li key={index}>
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", textJustify: "inter-word" }}
        >
          {step}
        </Typography>
      </li>
    );
  });

  return (
    <Grid item xs={11} md={11} lg={11}>
      <Typography variant="h4" sx={{ paddingBottom: "12px" }}>
        Instructions
      </Typography>
      <Box sx={{pl: 2.5}}>
        <ol>{steps}</ol>
      </Box>
    </Grid>
  );
}
