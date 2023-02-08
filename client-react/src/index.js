import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./index.css";
import AuthProvider from "Providers/AuthProvider";
import SearchProvider from "Providers/SearchProvider";
import FavouritesProvider from "Providers/FavouritesProvider";


const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <FavouritesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavouritesProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
