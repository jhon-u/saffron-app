import {useState, createContext} from 'react';
export const authContext = createContext();


const AuthProvider = function(props) {
 

  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState(null)

  const login = function(email) {
    setAuth(true);
    const id = "1";
    setUser({email, id})
  }

  const logout = function() {
    setAuth(false);
    setUser(null);
  }


  return (
    <authContext.Provider value={{user, auth, login, logout}}> 
      {props.children}
    </authContext.Provider>
  )

}

export default AuthProvider;