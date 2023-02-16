import { React, useContext } from "react";
import { Typography, Skeleton, Box } from "@mui/material";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function Description(props) {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);
  const html = recipeDetails.description;

  return (
    <>
      {loading ? (
        <Box sx={{ width: 700 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", textJustify: "inter-word" }}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
    </>
  );
}
