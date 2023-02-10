import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardMedia from "@mui/material/CardMedia";
import { Button, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Glycemic from "./Glycemic";
import NutritionScore from "./NutritionScore";
import NutritionList from "./NutritionList";

import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

import "./index.css";

import { useNavigate, useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RecipeDetails(props) {
  // const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { recipeDetails, setRecipeDetails } = useContext(recipeDetailsContext);

  const navigate = useNavigate();
  const params = useParams();
  console.log("recipeDetails check", recipeDetails)
  useEffect(() => {
    axios
      .get(`/api/recipes/:${params.id}`)
      .then((res) => {
        console.log("RES DATA", res.data);
        setRecipeDetails(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setRecipeDetails({ error: err.message });
      });
  }, [params.id]);

  const dishTypes = recipeDetails.dishTypes?.map((type) => {
    return <li key={type}>{type}</li>;
  });

  const steps = recipeDetails.instructions?.map((step, index) => {
    return <li key={index}>{step}</li>;
  });

  const ingredients = recipeDetails.ingredients?.map((ingredient, index) => {
    return (
      <li key={index}>
        {
          <>
            <span>{ingredient.amount} </span>
            <span>
              {ingredient.unit} {ingredient.name}
            </span>
          </>
        }
      </li>
    );
  });

  const RandomStarRating = () => {
    const [starRating, setStarRating] = useState(
      Math.floor(Math.random() * 5) + 1
    );

    return (
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating name="read-only" value={starRating} readOnly />
      </Box>
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Header left, aka Image */}
        <Grid container item xs={12} md={4} lg={2}>
          <Grid item xs={12} md={12} lg={12}>
            <CardMedia
              component="img"
              height="210"
              width="100"
              image={recipeDetails.image}
              alt={props.title}
            />
          </Grid>
        </Grid>

        {/* Header right */}
        <Grid container item xs={12} md={8} lg={10}>
          <Grid item xs={12} md={12} lg={12}>
            <Item>Title</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>URL</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>Summary</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            Prep and cook time
          </Grid>
        </Grid>

        {/* Body Right */}
        <Grid container item xs={12} md={8} lg={9}>
          <Grid item xs={12} md={12} lg={12}>
            <Item>Ingredients</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>Measures and Toggle</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>Steps</Item>
          </Grid>
        </Grid>

        {/* Body Left */}
        <Grid container item xs={12} md={4} lg={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Item>{loading && <NutritionScore />}</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>{loading && <NutritionList /> }</Item>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Item>{loading && <Glycemic />}</Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
