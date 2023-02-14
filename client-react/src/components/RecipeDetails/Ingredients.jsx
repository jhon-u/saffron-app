import React, { useEffect, useContext, useRef } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Grid, CardMedia, Typography } from "@mui/material";

export default function Ingredients() {
  const { servings, ingredients, setIngredients, measurementUnit } =
    useContext(recipeDetailsContext);

  const usePrevious = (value) => {
    const ref = useRef(servings);
    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const previousServing = usePrevious(servings);

  useEffect(() => {
    const newIngredients = ingredients?.map((ingredient) => {
      const measurement = ingredient.measures;
      const newAmountMetric =
        (measurement.metric.amount * servings) / previousServing;
      const newAmountUS = (measurement.us.amount * servings) / previousServing;
      return {
        ...ingredient,
        measures: {
          metric: {
            amount: newAmountMetric,
            unitShort: measurement.metric.unitShort,
            unitLong: measurement.metric.unitLong,
          },
          us: {
            amount: newAmountUS,
            unitShort: measurement.us.unitShort,
            unitLong: measurement.us.unitLong,
          },
        },
      };
    });

    setIngredients(newIngredients);
  }, [servings]);

  const toFraction = (value) => {
    // decimal to fraction
    console.log("VLAUE", value, measurementUnit);
    if (!value) return "";
    if (measurementUnit === "metric") return Math.floor(value);

    if (Math.floor(value) == value) return value;
    value = Math.abs(value);
    let ret = 0.01, // rounding error tolerance
      td = value - Math.floor(value), // trailing digits
      r = 1 / td, // reciprocal
      d = r, // start building denominator
      lim = 20; // max loop limit
    for (let i = 0; i < lim; i++) {
      td = r - Math.floor(r);
      if (Math.abs(r - Math.round(r)) < ret) break;
      r = 1 / td;
      d *= r;
    }
    return Math.round(d * value) + "/" + Math.round(d);
  };

  const ingredientsList = ingredients?.map((ingredient) => {
    return (
      <Grid key={ingredient.id} container item xs={12} md={12} lg={6}>
        <Grid item xs={1} md={1} lg={1}>
          <CardMedia
            component="img"
            height="24"
            width="24"
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={ingredient.name}
          />
        </Grid>
        <Grid item xs={11} md={11} lg={11}>
          <Typography sx={{ m: 1}}>
            <Typography component={"span"} sx={{ fontWeight: "bold" }}>
              {toFraction(ingredient.measures[measurementUnit].amount)}{" "}
              {ingredient.measures[measurementUnit].unitLong}
            </Typography>{" "}
            <Typography component={"span"}>
              {ingredient.originalName}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    );
  });

  return <> {ingredientsList}</>;
}
