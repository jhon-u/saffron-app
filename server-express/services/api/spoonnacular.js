require('dotenv').config();
const axios = require("axios");

const callSpoonacular = () => {
  const options = {
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch?apiKey=dc0acbac8a3b489290c0d01b067b3dfc&query=pasta&maxFat=25&number=20',
    
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = { callSpoonacular };