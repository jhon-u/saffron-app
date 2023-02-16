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

const { oneWeekMealPlan } = require("../services/api/mealplan-oneweek");

const { getUserByEmail } = require("../db/queries/users");
const db = require("../configs/db.config");
const { getFavourites } = require("../db/queries/favourites");
const { randomRecipes } = require("../services/api/random-recipes");
const { detailRecipes } = require("../services/api/recipe-details-real");
const { searchRecipes } = require("../services/api/search");

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, "..", "public");
console.log("public dir: ", public);
app.use(express.static(public));

app.get("/api/recipes", (req, res) => {
  console.log("server check ")
  randomRecipes().then((data) => {
    res.json(data);
  })
});

app.get("/api/recipes/:id", (req, res) => {
  detailRecipes(req.params.id).then((data) => {

    const instructions = (steps) => {
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
    console.log("data check on server api route", data)
    res.json({
      id: data.details.id,
      title: data.details.title,
      servings: data.details.servings,
      description: data.details.summary,
      cookTime: data.details.readyInMinutes,
      image: data.details.image,
      diet: data.details.diet,
      source: data.details.sourceUrl,
      ingredients: data.details.extendedIngredients,
      instructions: instructions(data.instructions),
      dishTypes: data.details.dishTypes,
      nutrition: nutrition(data.details.nutrition.nutrients),
      nutritionProperties: nutritionProperties(data.details.nutrition.properties)
    });
  })
  
});

app.get("/api/mealplan", (req, res) => {
  setTimeout(() => {
    res.json(oneWeekMealPlan);
  }, 1000);
})

app.post("/api/search", (req, res) => {
  console.log("api/search req.body check", req.body);
  searchRecipes(req.body).then((data) => {
    res.json(data)
  })
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
