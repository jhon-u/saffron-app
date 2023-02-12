import { React, useContext } from "react"
import { Typography } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Grid } from "@mui/material";

export default function Instructions(props) {

  const { recipeDetails } = useContext(recipeDetailsContext)

  const steps = recipeDetails.instructions?.map((step, index) => {
    return (
      <li key={index}>
        <Typography
            color="black"
            font='Roboto'
            variant="body2"
            fontWeight='light'
            fontSize={18}
            sx={{ textAlign: "justify", textJustify: "inter-word" }}
          >
          {step}
        </Typography>
      </li>
    ) 
    
    
    
    
  });

  return (
    <Grid item xs={11} md={11} lg={11}>
      <Typography 
        color="rgba(25,118,210,255)"
        font='Roboto'
        variant="h4"
        letterSpacing={1}
        fontWeight='bold'
        fontSize={30}
        sx={{ paddingBottom: "12px"}}
      >
        Instructions
      </Typography>
     <ol>{steps}</ol>
    </Grid>
  );
}

