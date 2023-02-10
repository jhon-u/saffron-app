// params on api search
// timeframe=day      can only be one day or one week
// targetCalories=2000
// diet=vegetarian   in this example
// excludes=(string comma seperated allergens or ingredients to exclude)  none in this example
// api key of course


const oneDayMealPlan = {
  "meals": [
      {
          "id": 640337,
          "imageType": "jpg",
          "title": "Cracked Wheat Cereal",
          "readyInMinutes": 45,
          "servings": 8,
          "sourceUrl": "https://spoonacular.com/cracked-wheat-cereal-640337"
      },
      {
          "id": 1697541,
          "imageType": "jpg",
          "title": "Pasta With Feta Cheese And Asparagus",
          "readyInMinutes": 20,
          "servings": 2,
          "sourceUrl": "https://spoonacular.com/pasta-with-feta-cheese-and-asparagus-1697541"
      },
      {
          "id": 657651,
          "imageType": "jpg",
          "title": "Quick Veggie Stir-Fry",
          "readyInMinutes": 45,
          "servings": 1,
          "sourceUrl": "https://spoonacular.com/quick-veggie-stir-fry-657651"
      }
  ],
  "nutrients": {
      "calories": 2000.11,
      "protein": 66.73,
      "fat": 87.26,
      "carbohydrates": 253.85
  }
}

module.exports = {oneDayMealPlan};