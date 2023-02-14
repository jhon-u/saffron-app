import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function CookTime(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  console.log('COOK TIME', recipeDetails)
  return (
    <Typography
      variant="body1"
      sx={{ display: "flex", alignItems: "center", paddingBottom: "12px", paddingTop: "10px"}}
    >
      <AccessTimeIcon style={{ marginRight: "8px", verticalAlign: "bottom" }} />
      Ready in: &nbsp; <b>{recipeDetails.cookTime}</b>&nbsp; minutes
    </Typography>
  );
}