require('dotenv').config();
const express = require("express");
const path = require('path');

const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
app.use(morgan('dev'));

const { callSpoonacular } = require('../services/api/spoonnacular');
// const demoData = require('../services/api/demo-data');
const { data } = require('../services/api/demo-data');
const { instructionData } = require('../services/api/instructions');
const { recipeDetails } = require('../services/api/recipe-details');
const { getAllUsers, getUserById } = require('../db/queries/users');
const db = require('../configs/db.config');

// serve static files from ../build (needed for React)
const cwd = process.cwd();
const public = path.join(cwd, '..', 'public');
console.log("public dir: ", public);
app.use(express.static(public));


// Do Not make a route for "/" or it will override public

app.get("/api/recipes", (req, res) => {


  // callSpoonacular().then((data) => {
    
  // })
  // console.log(data.results);
  // console.log(instructionData[0]);
  res.json({version: "1.01", results:data.results});
});

app.get("/api/recipes/:id", (req, res) => {
  // https://api.spoonacular.com/recipes/{id}/information
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
    const result = []
    for (const i in steps) {
    result.push(steps[i].step)
    }
    return result;
  }

  res.json({
    id:recipeDetails.id, 
    title:recipeDetails.title,
    servings:recipeDetails.servings,
    image:recipeDetails.image,
    diet:recipeDetails.diet,
    source:recipeDetails.spoonacularSourceUrl,
    ingredients:recipeDetails.extendedIngredients,
    instructions:instructions(instructionData),
    dishTypes:recipeDetails.dishTypes
  });
});

app.get("/users", (req, res) => {
  getAllUsers().then(data => {
    console.log(data)
    return res.json(data)
})
})

// routes to add favourites to database
app.post("/favourites", (req, res) => {
  console.log("hit favourites route")
  const data = req.body
  console.log("check req.body data in server side", data)
  const values = [];
  const addFavQuery = `
  INSERT INTO favourites (user_id, recipeid, title, image)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  db.query(addFavQuery, values)
    .then((result) => {
      res.json({status: 'success'})
    })
    .catch((err) => res.send(err))
})

app.use(function(req, res) {
  res.status(404);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});