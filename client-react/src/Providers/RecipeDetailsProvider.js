import { useState, createContext, useEffect } from "react";
export const recipeDetailsContext = createContext();

const RecipeDetailsProvider = function (props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [amounts, setAmounts] = useState(0);
  const [measurementUnit, setMeasurementUnit] = useState("us");

  const [openGroceriesModal, setOpenGroceriesModal] = useState(false);

  const updateAmounts = (value) => {
    setAmounts(value);
  };

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
    measurementUnit,
    setMeasurementUnit,
    openGroceriesModal,
    setOpenGroceriesModal
  };

  return (
    <recipeDetailsContext.Provider value={value}>
      {props.children}
    </recipeDetailsContext.Provider>
  );
};

export default RecipeDetailsProvider;
