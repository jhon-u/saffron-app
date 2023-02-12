import {useState, createContext, useContext} from 'react';
export const groceryListContext = createContext();
import { recipeDetailsContext } from './RecipeDetailsProvider';


const GroceryListProvider = function(props) {
  const { ingredients } = useContext(recipeDetailsContext);
  const [groceriesToAdd, setGroceriesToAdd] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);
  const [sortedByAisle, setSortedByAisle] = useState({});
  const [updateBoughtItems, setUpdateBoughtItems] = useState({});
  const [loading, setLoading] = useState(false)

  console.log('SORTED BY AISLE', sortedByAisle)
  console.log('UPDATED BOUGHT ITEM', updateBoughtItems)
  
  const value = { 
    groceriesToAdd,
    setGroceriesToAdd,
    ingredientsToRemove,
    setIngredientsToRemove,
    sortedByAisle,
    setSortedByAisle,
    updateBoughtItems,
    setUpdateBoughtItems,
    loading,
    setLoading
  }

  return (
    <groceryListContext.Provider value={value}> 
      {props.children}
    </groceryListContext.Provider>
  )
}

export default GroceryListProvider;