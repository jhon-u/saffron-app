require('dotenv').config();
const axios = require("axios");

const searchRecipes = (data) => {
  const dietString = data.diet.toString();
  const intolerancesString = data.intolerances.toString();

  const options = {
    method: 'GET',
    url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&diet=${dietString}&intolerances=${intolerancesString}&minProtein=${data.protein[0]}&maxProtein=${data.protein[1]}&minFat=${data.fat[0]}&maxFat=${data.fat[1]}&minCarbs=${data.carbs[0]}&maxCarbs=${data.carbs[1]}&number=10&nutrition=false`,

  };

  return axios.request(options)
    .then(function (response) {
      console.log("response check on search api", response.data.results)
      return response.data.results
    })

    .catch(function (error) {
      console.error(error);
    });
}

module.exports = { searchRecipes };
