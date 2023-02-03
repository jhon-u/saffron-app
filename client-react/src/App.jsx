import 'App.css';
import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import Button from '@mui/material/Button';
import SideBar from 'components/SideBar';

import BasicGrid from './components/Grid';

export default function App() {
  const [status, setStatus] = useState({});
  const context = createContext('Test')
  useEffect(() => {
    axios.get('/api/status')
      .then((res) => {
        console.log('RES: ', res)
        setStatus(res.data);
      })
      .catch((err) => {
        setStatus({ error: err.message });
      });
  }, []);

  const displayRecipe = status.results?.map((recipe) => {
    return (
      <li key={recipe.id}>
        {recipe.title}
      </li>
    )
  })

  return (

    <div>
      
      <SideBar />
    </div>
  );
}