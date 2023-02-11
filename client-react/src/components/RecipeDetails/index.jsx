import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Glycemic from "./Glycemic";
import NutritionScore from "./NutritionScore";
import NutritionList from "./NutritionList";
import Title from "./Title";
import Description from "./Description";
import Url from "./Url";
import CookTime from "./CookTime";
import Instructions from "./Instructions";

import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";

import Ingredients from "./Ingredients";
import Servings from "./Servings";
import MeasuresSelector from "./MeasuresSelector";
import AddToGroceriesBtn from "./AddToGroceriesBtn";

import "./index.css";

import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RecipeDetails(props) {
  const [loading, setLoading] = useState(true)
  const [starRating, setStarRating] = useState(Math.floor(Math.random() * 5) + 1);
  const { recipeDetails, setRecipeDetails, setServings, setIngredients } = useContext(recipeDetailsContext);
  const params = useParams();
  console.log("recipeDetails check", recipeDetails)

  useEffect(() => {

    axios
      .get(`/api/recipes/:${params.id}`)
      .then((res) => {
        console.log("RES DATA", res.data);
        setRecipeDetails(res.data);
        setServings(res.data.servings)
        setIngredients(res.data.ingredients)
        setLoading(false)
      })
      .catch((err) => {
        setRecipeDetails({ error: err.message });
      });
  }, [params.id]);

  // const dishTypes = recipeDetails.dishTypes?.map((type) => {
  //   return <li key={type}>{type}</li>;
  // });

  // const steps = recipeDetails.instructions?.map((step, index) => {
  //   return <li key={index}>{step}</li>;
  // });

  // const ingredients = recipeDetails.ingredients?.map((ingredient, index) => {
  //   return (
  //     <li key={index}>
  //       {
  //         <>
  //           <span>{ingredient.amount} </span>
  //           <span>
  //             {ingredient.unit} {ingredient.name}
  //           </span>
  //         </>
  //       }
  //     </li>
  //   );
  // });

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const previousRating = usePrevious(starRating);

  const RandomStarRating = () => {
    return (
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Rating name="read-only" value={previousRating} readOnly />
      </Box>
    );
  };

  return (

    <Box style={{ padding: "25px" }}>
      <Grid container spacing={2}>
        {/* Header left, aka Image */}
        <Grid container item xs={12} md={4} lg={2}>
          <Grid item xs={12} md={12} lg={12}>
            <CardMedia
              component="img"
              height="240"
              width="240"
              image={recipeDetails.image}
              alt={props.title}
            />
          </Grid>
        </Grid>

        {/* Header right */}
        <Grid container item xs={12} md={8} lg={10}>
          <Grid item xs={12} md={12} lg={12}>
            <Title />
            <RandomStarRating />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Url />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CookTime />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Description />
          </Grid>
        </Grid>

        {/* Body Right */}
        <Grid container item xs={12} md={8} lg={9}>
          <Grid container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                color="rgba(25,118,210,255)"
                font='Roboto'
                variant="h4"
                letterSpacing={1}
                fontWeight='bold'
                fontSize={30}
                sx={{ paddingBottom: "12px" }}
              >Ingredients</Typography>
            </Grid>
            {!loading && <Ingredients />}
          </Grid>

          {/* Servings, Measurements and Add to Groceries */}
          <Grid sx={{ mt: 3 }} container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={4} lg={4}>
              {!loading && <Servings />}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {!loading && <MeasuresSelector />}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {!loading && <AddToGroceriesBtn />}
            </Grid>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12} md={12} lg={12}>
            <Instructions />
          </Grid>
        </Grid>

        {/* Body Left */}

        <Grid container item xs={12} md={4} lg={3}>
          <Grid item xs={12} md={12} lg={12}>
            {!loading && <NutritionScore />}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {!loading && <NutritionList />}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {!loading && <Glycemic />}
          </Grid>
        </Grid>
      </Grid>
    </Box>

  );
}
