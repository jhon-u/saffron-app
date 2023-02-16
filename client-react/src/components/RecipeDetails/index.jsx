import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Skeleton,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";
import axios from "axios";

import Glycemic from "./Glycemic";
import NutritionScore from "./NutritionScore";
import NutritionList from "./NutritionList";
import Title from "./Title";
import Description from "./Description";
import Url from "./Url";
import CookTime from "./CookTime";
import Instructions from "./Instructions";
import Ingredients from "./Ingredients";
import Servings from "./Servings";
import MeasuresSelector from "./MeasuresSelector";
import AddToGroceriesBtn from "./AddToGroceriesBtn";
import RandomStarRating from "./RandomStarRating";
import RecipeImage from "./RecipeImage";

import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { loadingContext } from "../../Providers/LoadingProvider";

import "./index.css";

export default function RecipeDetails(props) {
  const {
    recipeDetails,
    setRecipeDetails,
    setServings,
    setIngredients,
    setNutrition,
  } = useContext(recipeDetailsContext);
  const { loading, setLoading } = useContext(loadingContext);

  // const [starRating] = useState(Math.floor(Math.random() * 5) + 1);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/recipes/${params.id}`)
      .then((res) => {
        setRecipeDetails(res.data);
        setServings(res.data.servings);
        setIngredients(res.data.ingredients);
        setLoading(false);
        setNutrition(res.data.nutrition);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);

  //   return ref.current;
  // };

  // const previousRating = usePrevious(starRating);

  // const RandomStarRating = () => {
  //   return (
  //     <Box sx={{ "& > legend": { mt: 2 } }}>
  //       <Rating name="read-only" value={previousRating} readOnly />
  //     </Box>
  //   );
  // };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
      <Grid container spacing={2}>
        {/* Header left, aka Image */}
        <Grid container item xs={12} md={4} lg={4}>
          <RecipeImage />
        </Grid>

        {/* Header right */}
        <Grid container item xs={12} md={8} lg={8}>
          <Grid item xs={12} md={12} lg={12}>
            <Title />
            <RandomStarRating />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {!loading && <Url />}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CookTime />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Description />
          </Grid>
        </Grid>

        {/* Body Left */}
        <Grid container item xs={12} md={8} lg={8} sx={{ p: 2 }}>
          <Grid container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>
              {!loading && (
                <Typography
                  variant="h4"
                  letterSpacing={1}
                  sx={{ paddingBottom: "12px" }}
                >
                  Ingredients
                </Typography>
              )}
            </Grid>
            {!loading && <Ingredients />}
          </Grid>

          {/* Servings, Measurements and Add to Groceries */}
          <Grid sx={{ mt: 3 }} container item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={4} lg={5}>
              {!loading && <Servings />}
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              {!loading && <MeasuresSelector />}
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {!loading && <AddToGroceriesBtn />}
            </Grid>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12} md={12} lg={12}>
            {!loading && <Instructions />}
          </Grid>
        </Grid>

        {/* Body Right */}

        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} md={12} lg={12}>
            {!loading && (
              <>
                <NutritionScore />
                <NutritionList />
                <Glycemic />
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
