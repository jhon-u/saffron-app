import { React ,useContext } from "react"
import { Typography } from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

export default function CookTime(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Typography color="black" font='Roboto' variant="body2">
      <AccessTimeIcon />Ready in: <b>{recipeDetails.time}</b> minutes
    </Typography>
  );
}