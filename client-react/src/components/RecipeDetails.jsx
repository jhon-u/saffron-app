import { useState, useEffect } from 'react'
import axios from 'axios';
import { Typography, Box, Grid, Paper } from "@mui/material"
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import CardMedia from '@mui/material/CardMedia';
import {Button} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecipeDetails(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get(`/api/recipes/:${props.id}`)
      .then((res) => {
        setRecipeDetails(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setRecipeDetails({ error: err.message });
      });
  }, []);

  const dishTypes = recipeDetails.dishTypes?.map((type) => {
    return (
      <li key={type}>
        {type}
      </li>
    )
  })
  
  const steps = recipeDetails.instructions?.map((step, index) => {
    return (
      <li key={index}>
       {step}
      </li>
    )
  })

  const ingredients = recipeDetails.ingredients?.map((ingredient, index) => {
    return (
      <li key={index}>
        {<><span>{ingredient.amount} </span><span>{ingredient.unit} {ingredient.name}</span></>}
      </li>
    )
  })

  return (
    <>
      {loading &&

        <Grid container spacing={2}>
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Grid item xs={3}>
            <Item>
              <CardMedia
                component="img"
                height="128"
                width="128"
                image={recipeDetails.image}
                alt={props.title}
              />
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item>{recipeDetails.title}</Item>
            <Item>
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </Item>
            <Item>{<ul>{dishTypes}</ul>}</Item>
          </Grid>
          <Grid item xs={8}>
            <Item><ul>{steps}</ul></Item>
          </Grid>
          <Grid item xs={4}>
            <Item><ul>{ingredients}</ul></Item>
          </Grid>
        </Grid>
      }
    </>
  )
}