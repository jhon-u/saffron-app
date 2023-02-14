import React from "react";
import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import AppToolbar from "./components/AppToolbar";
import SideBar from "components/SideBar";
import AdvancedSearch from "./components/AdvancedSearch";
import LoginForm from "components/LoginForm";
import MenuBar from "./components/MenuBar";

//Pages
import Recipes from "./pages/Recipes";
import Groceries from "./pages/Groceries";
import RecipeDetails from "./components/RecipeDetails";
import Favourites from "pages/Favourites";
import MealPlanner from "pages/MealPlanner";


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
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const recipeId = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        setRecipes({ error: err.message });
      });
  }, []);

  return (
    <div>
      {!recipes.error && (
        <>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            {/* <AppToolbar
              handleDrawerOpen={handleDrawerOpen}
              open={open}
              advSearch={handleVisibility}
            /> */}
            <MenuBar />
            {/* <SideBar handleDrawerClose={handleDrawerClose} open={open} /> */}

            <Box component="main" sx={{ backgroundColor: '#f7fafc', flexGrow: 1, p: 3, height: '100vh'}}>
              <DrawerHeader />
              <Box sx={{backgroundColor: '#734060', height: 200, mb: 3}}>
                <Typography variant="h2" textAlign='center'>
                  Something cool here!
                </Typography>

              </Box>
              <Routes>
                <Route
                  path="/"
                  element={<Recipes recipes={recipes} advSearch={isVisible} />}
                />
                <Route path="/receipes/:id" element={<RecipeDetails />} />
                <Route path="/grocery-list" element={<Groceries />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/mealplanner" element={<MealPlanner />} />
              </Routes>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
