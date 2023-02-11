import React, { useContext, useState } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { groceryListContext } from "../../Providers/GroceryListProvider";
import {
  Grid,
  CardMedia,
  Typography,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import Spinner from "../Spinner";
import { pink } from "@mui/material/colors";

export default function ShoppingList() {
  const { ingredients, measurementUnit, setOpenGroceriesModal } =
    useContext(recipeDetailsContext);
  const { setGroceriesToAdd, ingredientsToRemove, setIngredientsToRemove } =
    useContext(groceryListContext);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, ingredientId) => {
    if (!event.target.checked) {
      setIngredientsToRemove([...ingredientsToRemove, ingredientId]);
    } else {
      const newIngredientListToRemove = ingredientsToRemove.filter(
        (item) => item !== ingredientId
      );
      setIngredientsToRemove(newIngredientListToRemove);
    }
  };

  const handleClick = () => {
    setLoading(true);
    const itemsToAddToShoppingList = [];
    ingredients.filter((ingredient) => {
      if (ingredientsToRemove.indexOf(ingredient.id) === -1) {
        itemsToAddToShoppingList.push(ingredient);
      }
    });
    setGroceriesToAdd(itemsToAddToShoppingList);

    setTimeout(() => {
      setLoading(false);
      setOpenGroceriesModal(false);
    }, 500);
  };

  const toFraction = (value) => {
    // decimal to fraction
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

  // const usePrevious = (value) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);

  //   return ref.current;
  // };

  // const previousServing = usePrevious(servings);

  // useEffect(() => {
  //   const newIngredients = ingredients?.map((ingredient) => {
  //     const measurement = ingredient.measures;
  //     const newAmountMetric =
  //       (measurement.metric.amount * servings) / previousServing;
  //     const newAmountUS = (measurement.us.amount * servings) / previousServing;

  //     return {
  //       ...ingredient,
  //       measures: {
  //         metric: {
  //           amount: newAmountMetric,
  //           unitShort: measurement.metric.unitShort,
  //           unitLong: measurement.metric.unitLong,
  //         },
  //         us: {
  //           amount: newAmountUS,
  //           unitShort: measurement.us.unitShort,
  //           unitLong: measurement.us.unitLong,
  //         },
  //       },
  //     };
  //   });

  //   setIngredients(newIngredients);
  // }, [servings]);

  const ingredientsList = ingredients?.map((ingredient) => {
    return (
      <Grid key={ingredient.id} container item xs={12} md={12} lg={12}>
        <Grid item xs={1} md={1} lg={1}>
          <CardMedia
            component="img"
            height="24"
            width="24"
            src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
            alt={ingredient.name}
          />
        </Grid>
        <Grid item xs={10} md={10} lg={10}>
          <Typography sx={{ m: 1 }}>
            <Typography component={"span"} sx={{ fontWeight: "bold" }}>
              {toFraction(ingredient.measures[measurementUnit].amount)}{" "}
              {ingredient.measures[measurementUnit].unitLong}
            </Typography>{" "}
            {ingredient.originalName}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1} lg={1}>
          <Checkbox
            defaultChecked
            onChange={(event) => handleChange(event, ingredient.id)}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        </Grid>
      </Grid>
    );
  });

  return (
    <Grid container item xs={12} md={12} lg={12}>
      {ingredientsList}
      <Button
        sx={{ width: "100%", mt: 1 }}
        variant="contained"
        onClick={handleClick}
      >
        Add {ingredients.length - ingredientsToRemove.length} items
      </Button>
    </Grid>
  );
}
