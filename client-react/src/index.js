import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./index.css";
import AuthProvider from "Providers/AuthProvider";
import SearchProvider from "Providers/SearchProvider";
import FavouritesProvider from "Providers/FavouritesProvider";
import RecipeDetailsProvider from "./Providers/RecipeDetailsProvider";
import MealPlanProvider from "Providers/MealPlanProvider";
import GroceryListProvider from "./Providers/GroceryListProvider";
import LoadingProvider from "./Providers/LoadingProvider";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <SearchProvider>
          <MealPlanProvider>
            <FavouritesProvider>
              <RecipeDetailsProvider>
                <GroceryListProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </GroceryListProvider>
              </RecipeDetailsProvider>
            </FavouritesProvider>
          </MealPlanProvider>
        </SearchProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
