import { React, useContext } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function Title(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);

  return (
    <>
      {loading ? (
        <Box sx={{ width: 700 }}>
          <Skeleton />
        </Box>
      ) : (
        <Typography variant="h4" letterSpacing={1} textTransform="uppercase">
          {recipeDetails.title}
        </Typography>
      )}
    </>
  );
}
