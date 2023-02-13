import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "components/RecipeCard";
import { authContext } from "Providers/AuthProvider"
import { useContext, useNavigate } from "react";
import LoginForm from "components/LoginForm";
import { favouritesContext } from "Providers/FavouritesProvider";
import { Box, Grid, Typography } from "@mui/material";

export default function Favourites(props) {
  // const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeId, setRecipeId] = useState(null)

  const { auth, user } = useContext(authContext)
  const { favourites, setFavourites, getFavourites } = useContext(favouritesContext)

  console.log("auth and user check on favourites page", auth, user, favourites)
  const getRecipeId = (id) => {
    setRecipeId(id)
  }

  // useEffect(() => {
  //   axios.get(`/favourites`)
  //     .then((res) => {
  //       setFavourites(res.data);
  //       setLoading(true);
  //     })
  //     .catch((err) => {
  //       setFavourites({ error: err.message });
  //     });
  // }, []);

  const displayFavourites = favourites?.map((recipe) => {
    return (
      <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
        <RecipeCard
          id={recipe.recipeid}
          title={recipe.title}
          image={recipe.image}
          onClick={getRecipeId}
        />
      </Grid>
    );
  });

  return (
    <>
      {auth && <Typography variant="h4" sx={{mb: 4}}>
        Favourites
      </Typography>}
      {auth && (
        <Grid container spacing={2} justify="center" >
          {displayFavourites}
        </Grid>
      )}
      {!auth && (
        <Box>
          <LoginForm path={"/favourites"}/>
        </Box>
      )}
    </>
  )
}