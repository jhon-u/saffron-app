require('dotenv').config();
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json())

const { callSpoonacular } = require('../services/api/spoonnacular');
// const demoData = require('../services/api/demo-data');
const { data } = require('../services/api/demo-data');
const { instructionData } = require('../services/api/instructions');
const { recipeDetails } = require('../services/api/recipe-details');
const { getAllUsers, getUserById } = require('../db/queries/users');
const db = require('../configs/db.config');
const { getFavourites } = require('../db/queries/favourites');



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
  console.log("#1 hit favourites route")
  const data = req.body
  console.log("#2 check req.body data in server side", data)
  const values = [1, data.id, data.title, data.image];
  const addFavQuery = `
  INSERT INTO favourites (user_id, recipeid, title, image)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;

  db.query(addFavQuery, values)
    .then((result) => {
      console.log("#3 result rows check:", result.rows)
      res.json({status: 'success'})
    })
    .catch((err) => res.send(err))
})

// routes to get favourites from database
app.get("/favourites", (req, res) => {
  getFavourites()
    .then(results => res.json(results))
})

app.use(function(req, res) {
  res.status(404);
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});