import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Grid, Paper } from "@mui/material"
import { styled } from '@mui/material/styles';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';

import 'components/RecipeDetails.css';

import { useNavigate, useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RecipeDetails(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(() => {
    axios.get(`/api/recipes/:${params.id}`)
      .then((res) => {
        setRecipeDetails(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setRecipeDetails({ error: err.message });
      });
  }, [params.id]);

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

  const RandomStarRating = () => {
    const [starRating, setStarRating] = useState(Math.floor(Math.random() * 5) + 1);

    return (
      <Box sx={{ '& > legend': { mt: 2 }, }} >
        <Rating name="read-only" value={starRating} readOnly />
      </Box>
    );
  }



  return (
    <>
      <Button onClick={() => navigate(-1)}>Back</Button>
      {loading &&
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <h2>{recipeDetails.title}</h2>
        <RandomStarRating />
        </Grid>
        <Grid item xs={3}>
          <Item>
            <CardMedia
              component="img"
              height="210"
              width="100"
              image={recipeDetails.image}
              alt={props.title}
            />
          </Item>
        </Grid>
        <Grid item xs={6}>
        <Item>{<ul>{dishTypes}</ul>} <br /><item><LocalDiningIcon /> Servings: {recipeDetails.servings} &nbsp; &nbsp; &nbsp; <AccessTimeIcon /> Ready in: {recipeDetails.readyInMinutes} minutes</item></Item>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        </Grid>
      }
      <div className="container">

        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul id="ingredients-list">
          {ingredients}
          </ul>
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <ol id="method-list">
          {steps}
          </ol>
        </div>
      </div>
    </>
  )
}