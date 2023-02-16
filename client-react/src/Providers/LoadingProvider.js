import {useState, createContext} from 'react';
export const loadingContext = createContext();


const LoadingProvider = function(props) {
  const [loading, setLoading] = useState(true);
  
  const value = { 
    loading,
    setLoading,
  }

  return (
    <loadingContext.Provider value={value}> 
      {props.children}
    </loadingContext.Provider>
  )
}

export default LoadingProvider;