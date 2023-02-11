import {useState, createContext, useContext} from 'react';
export const groceryListContext = createContext();
import { recipeDetailsContext } from './RecipeDetailsProvider';


const GroceryListProvider = function(props) {
  const { ingredients } = useContext(recipeDetailsContext);
  const [groceriesToAdd, setGroceriesToAdd] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);
  
  const value = { 
    groceriesToAdd,
    setGroceriesToAdd,
    ingredientsToRemove,
    setIngredientsToRemove
  }

  return (
    <groceryListContext.Provider value={value}> 
      {props.children}
    </groceryListContext.Provider>
  )
}

export default GroceryListProvider;