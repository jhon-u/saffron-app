import 'App.css';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import Button from '@mui/material/Button';
import SideBar from 'components/SideBar';

import BasicGrid from './components/Grid';

export default function App() {
  const [recipes, setRecipes] = useState({});
  const context = createContext('Test')
  useEffect(() => {
    axios.get('/api/status')
      .then((res) => {
        console.log('RES: ', res)
        setRecipes(res.data);
      })
      .catch((err) => {
        setRecipes({ error: err.message });
      });
  }, []);

  return (

    <div>
        {!recipes.error &&
      <SideBar recipes={recipes} />
        }
    </div>
  );
}