import {useState, createContext, useContext} from 'react';
export const groceryListContext = createContext();

const GroceryListProvider = function(props) {
  const [groceriesToAdd, setGroceriesToAdd] = useState([]);
  const [ingredientsToRemove, setIngredientsToRemove] = useState([]);
  const [sortedByAisle, setSortedByAisle] = useState({});
  const [updateBoughtItems, setUpdateBoughtItems] = useState({});

  const value = { 
    groceriesToAdd,
    setGroceriesToAdd,
    ingredientsToRemove,
    setIngredientsToRemove,
    sortedByAisle,
    setSortedByAisle,
    updateBoughtItems,
    setUpdateBoughtItems,
  }

  return (
    <groceryListContext.Provider value={value}> 
      {props.children}
    </groceryListContext.Provider>
  )
}

export default GroceryListProvider;