import React, { useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import AdvancedSearch from "../components/AdvancedSearch";
import { useState, useContext } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import { searchContext } from "Providers/SearchProvider";

import saffronFlower from "../assets/saffron_flower.png";

import Spinner from "../components/Spinner";

import {
  CardMedia,
  Box,
  Collapse,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
} from "@mui/material";

export default function Recipes(props) {
  const [recipeId, setRecipeId] = useState(null);

  const { favourites } = useContext(favouritesContext);
  const { searchResults, loading, showSearch } = useContext(searchContext);

  const getRecipeId = (id) => {
    setRecipeId(id);
  };

  const displayRecipes = (data) => {
    return data?.map((recipe) => {
      return (
        <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            onClick={getRecipeId}
            height={"300px"}
          />
        </Grid>
      );
    });
  };

  return (
    <Box>
      {/* Hero unit */}
      <Grid
        container
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Grid item xs={12} md={8} lg={8}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{fontFamily: "Sacramento", fontSize: '6rem'}}
          >
            Saffron
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            paragraph
          >
            We’ve organized these recipes every way we could think of so you
            don't have to! Dietary restrictions, weeknight dinners, meal prep
            recipes, some of our most tried-and-true… no matter how you browse,
            we’re sure you’ll find just what you were looking for.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CardMedia
            component="img"
            height="300"
            width="300"
            src={saffronFlower}
            alt={"saffron flower"}
            sx={{ objectFit: "contain" }}
          />
        </Grid>
      </Grid>
      {/* End hero unit */}

      <Collapse in={props.advSearch} timeout={"auto"}>
        <AdvancedSearch />
      </Collapse>
      {!loading && (
        <Grid container spacing={2} justify="center">
          {!showSearch && displayRecipes(props.recipes)}
          {showSearch && displayRecipes(searchResults)}
        </Grid>
      )}
      {loading && (
        <Box>
          <Spinner />
        </Box>
      )}
    </Box>
  );
}
