import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "components/RecipeCard";


export default function Favourites(props) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeId, setRecipeId] = useState(null)

  const getRecipeId = (id) => {
    console.log('RECIPE ID', id)
    setRecipeId(id)
  }

  useEffect(() => {
    axios.get(`/favourites`)
      .then((res) => {
        setFavourites(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setFavourites({ error: err.message });
      });
  }, []);

  const displayFavourites = favourites?.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        image={recipe.image}
        onClick={getRecipeId}
      />
    );
  });

  return (
    <>
      {loading && (
        <div className="recipeList">
          {displayFavourites}
        </div>
      )}
    </>
  )
}