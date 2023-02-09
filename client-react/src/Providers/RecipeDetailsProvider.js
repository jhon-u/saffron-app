import {useState, createContext} from 'react';
export const recipeDetailsContext = createContext();


const RecipeDetailsProvider = function(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  
  const value = { 
    recipeDetails,
    setRecipeDetails,
    
  }

  return (
    <recipeDetailsContext.Provider value={value}> 
      {props.children}
    </recipeDetailsContext.Provider>
  )
}

export default RecipeDetailsProvider;