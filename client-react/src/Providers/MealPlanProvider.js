import {useState, createContext} from 'react';
export const mealPlanContext = createContext();


const MealPlanProvider = function(props) {
  const [mealPlan, setMealPlan] = useState({});
  
  const value = { 
    mealPlan,
    setMealPlan,
  }

  return (
    <mealPlanContext.Provider value={value}> 
      {props.children}
    </mealPlanContext.Provider>
  )
}

export default MealPlanProvider;