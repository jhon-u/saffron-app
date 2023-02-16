import { React, useContext } from "react";
import { Typography, Box, Skeleton, CardMedia } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function RecipeImage(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);

  return (
    <>
      {loading ? (
        <Box sx={{ width: 350 }}>
          <Skeleton variant="rounded" height={300}/>
        </Box>
      ) : (
        <Grid item xs={12} md={12} lg={12}>
          <CardMedia
            component="img"
            height="auto"
            width="400"
            image={recipeDetails.image}
            alt={props.title}
            sx={{ objectFit: "contain", borderRadius: 2 }}
          />
        </Grid>
      )}
    </>
  );
}
