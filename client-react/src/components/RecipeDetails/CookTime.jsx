import { useContext } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { loadingContext } from "../../Providers/LoadingProvider";

export default function CookTime() {
  const { recipeDetails } = useContext(recipeDetailsContext);
  const { loading } = useContext(loadingContext);

  const CookingTime = () => {
    return recipeDetails.cookTime;
  };

  return (
    <>
    {loading ? (
      <Box sx={{ width: 150 }}>
      <Skeleton />
    </Box>
    ) : (
      <Typography
      variant="body2"
      sx={{
        display: "flex",
        alignItems: "center",
        paddingBottom: "12px",
        paddingTop: "10px",
      }}
    >
      <AccessTimeIcon sx={{ marginRight: "8px", verticalAlign: "bottom" }} />
      Ready in: &nbsp; <b>{<CookingTime />}</b>&nbsp; minutes
    </Typography>
    )
    
  }
    </>
    
  );
}
