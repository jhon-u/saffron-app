import { React ,useContext } from "react"
import { Typography, Link } from "@mui/material"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";


export default function Url(props) {

  const { recipeDetails } = useContext(recipeDetailsContext)

  return (
    <Link href={recipeDetails.source} color="rgba(25,118,210,255)" underline='hover'>
      <Typography variant="subtitle2">
        <b>{recipeDetails.source}</b>
      </Typography>
    </Link>
  );
}