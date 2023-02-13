import React, { useRef } from "react";
import RecipeCard from "../components/RecipeCard";
import AdvancedSearch from "../components/AdvancedSearch";
import { useState, useContext } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import { searchContext } from "Providers/SearchProvider";

import Spinner from "../components/Spinner";

import { Collapse, Grid, Container, Typography, Stack, Button } from "@mui/material";
import { Box } from "@mui/system";

export default function Recipes(props) {
  const [recipeId, setRecipeId] = useState(null);
  
  
  const {favourites} = useContext(favouritesContext)
  const { searchResults, loading, showSearch } = useContext(searchContext)
  
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
          />
        </Grid>
      );
    });
  }

  return (
    <Box>

      {/* Hero unit */}
      <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Something cool here!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}

      <Collapse in={props.advSearch} timeout={"auto"}>
        <AdvancedSearch />
      </Collapse>
      {!loading && <Grid container spacing={2} justify="center">
        { !showSearch && displayRecipes(props.recipes.results) }
        { showSearch && displayRecipes(searchResults) }
      </Grid>}
      {loading &&
        <Box>
          <Spinner />
        </Box>
      }
    </Box>
  );
}
