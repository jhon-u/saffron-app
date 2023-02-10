import {useState, createContext, useEffect} from 'react';
export const recipeDetailsContext = createContext();


const RecipeDetailsProvider = function(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState([])
  const [amounts, setAmounts] = useState(0)
  const [measure, setMeasure] = useState('us');

  const updateAmounts = (value) => {
    setAmounts(value)
  }

  const value = { 
    recipeDetails,
    setRecipeDetails,
    servings,
    setServings, 
    amounts,
    setAmounts,
    ingredients,
    setIngredients,
    updateAmounts,
    measure,
    setMeasure
  }




  return (
    <recipeDetailsContext.Provider value={value}> 
      {props.children}
    </recipeDetailsContext.Provider>
  )
}

export default RecipeDetailsProvider;