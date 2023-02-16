require("dotenv").config();
const axios = require("axios");

const randomRecipes = () => {
  const options = {
    method: "GET",
    url: `https://api.spoonacular.com/recipes/random?number=20&apiKey=${process.env.API_KEY}`,
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log("RESPONSE", response);
      const filterData = response.data.recipes.filter((recipe) => {
        return recipe.image !== undefined;
      });
      return filterData;
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { randomRecipes };
