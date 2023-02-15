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
    // console.log("days.data check", days.data)
    console.log("ALL CHECK ON RECIPE-DETAILS-REAL...instructions", instructions.data[0].steps)

    return { details: details.data, instructions: instructions.data[0].steps }
  })
    .catch(err => console.log(err))
  }


module.exports = { detailRecipes };
