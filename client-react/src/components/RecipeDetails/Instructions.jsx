import { React, useContext } from "react";
import { Typography } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Grid } from "@mui/material";

export default function Instructions(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);

  const steps = recipeDetails.instructions?.map((step, index) => {
    return (
      <Grid container item xs={12} md={12} lg={12} sx={{ m: 1 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="body1"
            sx={{ color: "#909bab", fontWeight: "bold" }}
          >
            Step {index + 1}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="body1"
            sx={{
              textAlign: "justify",
              textJustify: "inter-word",
              fontWeight: "bold",
            }}
          >
            {step}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  return (
    <Grid item xs={11} md={11} lg={11}>
      {steps}
    </Grid>
  );
}
