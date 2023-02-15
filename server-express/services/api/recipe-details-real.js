require('dotenv').config();
const axios = require("axios");

const detailRecipes = (id) => {
console.log("is the id showing up", id)
const detailsRecipes = axios.get(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${process.env.API_KEY}`)
const instructionsRecipes = axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.API_KEY}`)
  return Promise.all([
    detailsRecipes, 
    instructionsRecipes
  ]).then((all) => {
    const [details, instructions] = all
   
    return { details: details.data, instructions: instructions.data[0].steps }
  })
    .catch(err => console.log(err))
  }


module.exports = { detailRecipes };
