import {useState, createContext} from 'react';
export const searchContext = createContext();


const SearchProvider = function(props) {
 
  const [ diet, setDiet ] = useState("")
  const [ intolerances, setIntolerances ] = useState("")
  const [ carbs, setCarbs ] = useState([10, 50])
  const [ fat, setFat ] = useState([10, 50])
  const [ protein, setProtein ] = useState([10, 50])
  
  const value = { diet, setDiet, intolerances, setIntolerances, carbs, setCarbs, fat, setFat, protein, setProtein
  }

  return (
    <searchContext.Provider value={value}> 
      {props.children}
    </searchContext.Provider>
  )
}

export default SearchProvider;