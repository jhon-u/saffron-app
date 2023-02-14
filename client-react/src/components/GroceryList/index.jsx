import React, { useEffect, useContext, useRef, useState } from "react";
import { groceryListContext } from "../../Providers/GroceryListProvider";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Grid, CardMedia, Typography, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";

export default function GroceryList(props) {
  const {
    groceriesToAdd,
    setGroceriesToAdd,
    setSortedByAisle,
    sortedByAisle,
    setUpdateBoughtItems,
    updateBoughtItems,
    setLoading,
    loading,
  } = useContext(groceryListContext);
  const { measurementUnit } = useContext(recipeDetailsContext);

  const sortByAisle = () => {
    console.log("New Groveries to Add", groceriesToAdd);
    const results = {};
    for (const item of groceriesToAdd) {
      if (results.hasOwnProperty(item.aisle)) {
        results[item.aisle].push(item);
      } else {
        results[item.aisle] = [item];
      }
    }
    // return results;
    console.log("RESULTS", results);
    setSortedByAisle(results);
    setLoading(false);
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

  const handleChange = (event, ingredient) => {
    setLoading(true);
    console.log('CHECKED', event.target.checked)
    if (event.target.checked) {
      const boughtItems = {...updateBoughtItems, [ingredient.id]: ingredient.aisle}
      setUpdateBoughtItems(boughtItems);
      const sortedBoughtItems = sortBoughtItems(groceriesToAdd, boughtItems);
      setGroceriesToAdd(sortedBoughtItems);
    }
  };

  function sortBoughtItems(groceriesToAdd, boughtItems) {
    const results = [];

    groceriesToAdd.forEach((item) => {
      if (boughtItems.hasOwnProperty(item.id)) {
        results.push({
          ...item,
          aisle: "Bought Items",
          checked: true,
        });
      } else {
        results.push(item);
      }
    });

    results.sort(function (a, b) {
      return (
        (a.aisle === "Bought Items") - (b.aisle === "Bought Items") ||
        +(a.aisle > b.aisle) ||
        -(a.aisle < b.aisle)
      );
    });

    return results;
  }

  useEffect(() => {
    sortByAisle();
  }, [groceriesToAdd]);

  const displayItemsByAisle = Object.keys(sortedByAisle).map((aisle, index) => {
    
    return (
      <Grid key={index} container item xs={12} md={12} lg={12}>
        <Grid item xs={12} md={12} lg={12} sx={{ m: 2 }}>
          <Typography>{aisle}</Typography>
        </Grid>
        <Grid container item xs={12} md={12} lg={12}>
          {sortedByAisle[aisle]?.map((ingredient) => {
            return (
              <Grid
                key={ingredient.id}
                container
                item
                xs={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  ml: 1,
                  mb: 0.5,
                  borderRadius: 1,
                }}
              >
                <Grid item xs={1} md={1} lg={1}>
                  <CardMedia
                    component="img"
                    height="24"
                    width="24"
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                    sx={{ objectFit: "contain" }}
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
                    checked={ingredient.checked ? true : false}
                    onChange={(event) => handleChange(event, ingredient)}
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
          })}
        </Grid>
      </Grid>
    );
  });

  return <Box>{displayItemsByAisle}</Box>;
}
