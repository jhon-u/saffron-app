import React from "react";
import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "components/SideBar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import RecipeCard from "./components/RecipeCard";
import AppToolbar from "./components/AppToolbar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [recipes, setRecipes] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    console.log("I was called");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((res) => {
        console.log("RES: ", res);
        setRecipes(res.data);
      })
      .catch((err) => {
        setRecipes({ error: err.message });
      });
  }, []);

  const displayRecipe = recipes.results?.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
      />
    );
  });

  return (
    <div>
      {!recipes.error && (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppToolbar handleDrawerOpen={handleDrawerOpen} open={open} />
            <SideBar handleDrawerClose={handleDrawerClose} open={open} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <div className="recipeList">{displayRecipe}</div>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
