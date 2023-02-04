import React from "react";
import "App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "components/SideBar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";


import AppToolbar from "./components/AppToolbar";
import Recipes from "./pages/Recipes";


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
              <Recipes recipes={recipes}/>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
