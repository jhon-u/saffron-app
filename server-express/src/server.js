require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { callSpoonacular } = require("../services/api/spoonnacular");
// const demoData = require('../services/api/demo-data');
const { data } = require("../services/api/demo-data");
const { instructionData } = require("../services/api/instructions");
const { recipeDetails } = require("../services/api/recipe-details");
const { search } = require("../services/api/advanced-search");
const { nutritionData } = require("../services/api/nutrition");
const { oneWeekMealPlan } = require("../services/api/mealplan-oneweek");

const {
  getAllUsers,
  getUserById,
  getUserByEmail,
} = require("../db/queries/users");
const db = require("../configs/db.config");
const { getFavourites } = require("../db/queries/favourites");
const { default: axios } = require("axios");

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, "..", "public");
console.log("public dir: ", public);
app.use(express.static(public));

// Do Not make a route for "/" or it will override public

app.get("/api/recipes", (req, res) => {
  // callSpoonacular().then((data) => {

  // })
  // console.log(data.results);
  // console.log(instructionData[0]);
  res.json({ version: "1.01", results: data.results });
});

app.get("/api/recipes/:id", (req, res) => {
  // https://api.spoonacular.com/recipes/{id}/information&includeNutrition=true
  // extendedIngredients - array of objects
  //id
  //title
  //sevings
  //image
  //diet - array of strings
  //spoonacularSourceUrl
  //instructions: https://api.spoonacular.com/recipes/{id}/analyzedInstructions

  const instructions = (instructionData) => {
    const steps = instructionData[0].steps;
    const result = [];
    for (const i in steps) {
      result.push(steps[i].step);
    }
    return result;
  };

  const nutrition = (nutrients) => {
    const result = {};

    const nutritionValues = [
      "Calories",
      "Fat",
      "Carbohydrates",
      "Sugar",
      "Protein",
      "Sodium",
      "Fiber",
    ];

    for (const nutrient of nutrients) {
      if(nutritionValues.indexOf(nutrient.name) !== -1) {
        result[nutrient.name] = {
          amount: nutrient.amount,
          percentOfDailyNeeds: nutrient.percentOfDailyNeeds
        }
      }
    }

    return result;
  };

  function nutritionProperties (properties) {
    const result = {}
    
    for (const property of properties) {
      result[property.name] = {
        amount: property.amount,
      }
    }

    return result;
  }

  res.json({
    id: recipeDetails.id,
    title: recipeDetails.title,
    servings: recipeDetails.servings,
    description: recipeDetails.summary,
    image: recipeDetails.image,
    diet: recipeDetails.diet,
    source: recipeDetails.sourceUrl,
    ingredients: recipeDetails.extendedIngredients,
    instructions: instructions(instructionData),
    dishTypes: recipeDetails.dishTypes,
    nutrition: nutrition(recipeDetails.nutrition.nutrients),
    nutritionProperties: nutritionProperties(recipeDetails.nutrition.properties)
  });
});

app.get("/api/mealplan", (req, res) => {
  setTimeout(() => {
    res.json(oneWeekMealPlan);
  }, 1000);
})

app.post("/api/search", (req, res) => {
  console.log("api/search req.body check", req.body);

  const dietString = req.body.diet.toString();
  const intolerancesString = req.body.intolerances.toString(nutritionData.properties);

  // const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&diet=${dietString}&intolerances=${intolerancesString}&minProtein=${req.body.protein[0]}&maxProtein=${req.body.protein[1]}&minFat=${req.body.fat[0]}&maxFat=${req.body.fat[1]}&minCarbs=${req.body.carbs[0]}&maxCarbs=${req.body.carbs[1]}&number=10&nutrition=false`

  setTimeout(() => {
    res.json(search);
  }, 1000);

  // axios.get(url)
  //   .then((result) => {
  //     console.log(result.data.results)
  //     res.json({
  //       data: result.data.results
  //     })
  //   })
  //   .catch((error) => console.log(error))
});

app.post("/api/recipes/delete", function (req, res) {
  const value = [req.body.recipeid];
  const deleteQuery = `
  DELETE FROM favourites WHERE recipeid = $1
  `;
  db.query(deleteQuery, value)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => res.send(err));
});

app.post("/users", (req, res) => {
  getUserByEmail(req.body.email).then((data) => {
    return res.json(data);
  });
});

// routes to add favourites to database
app.post("/favourites", (req, res) => {
  const data = req.body;
  const values = [1, data.recipeid, data.title, data.image];
  const addFavQuery = `
  INSERT INTO favourites (user_id, recipeid, title, image)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  db.query(addFavQuery, values)
    .then((result) => {
      //result.rows is what we are looking for
      res.json(result.rows);
    })
    .catch((err) => res.send(err));
});

// routes to get favourites from database
app.get("/favourites", (req, res) => {
  getFavourites().then((results) => res.json(results));
});

app.use(function (req, res) {
  res.status(404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
