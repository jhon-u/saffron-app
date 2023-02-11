import {useState, createContext, useContext} from 'react';
export const groceryListContext = createContext();
import { recipeDetailsContext } from './RecipeDetailsProvider';


const GroceryListProvider = function(props) {
  const { ingredients } = useContext(recipeDetailsContext);
  const [groceriesToAdd, setGroceriesToAdd] = useState(ingredients);
  
  const value = { 
    groceriesToAdd,
    setGroceriesToAdd,
  }

  return (
    <groceryListContext.Provider value={value}> 
      {props.children}
    </groceryListContext.Provider>
  )
}

export default GroceryListProvider;