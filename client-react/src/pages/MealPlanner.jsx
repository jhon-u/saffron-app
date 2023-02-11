import MealPlans from "components/MealPlans";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "helpers/StrictMode.Droppable";
import { useContext, useNavigate } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import RecipeCard from "components/RecipeCard";

export default function MealPlanner() {
  const { favourites, setFavourites, getFavourites } = useContext(favouritesContext)
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState(favourites);

  const getRecipeId = (id) => {
    setRecipeId(id)
  }

  useEffect(() => {
    axios.get(`/favourites`)
      .then((res) => {
        console.log("is this hitting again for axios?")
        setFavourites(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setFavourites({ error: err.message });
      });
  }, []);
  console.log("meals check", meals)
  const displayFavourites = favourites?.map((recipe, index) => {
    return (
      <Draggable key={recipe.id} draggableId={recipe.id.toString()} index={index}>
        {(provided) => (
        <li{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        <RecipeCard
          // key={recipe.id}
          id={recipe.recipeid}
          title={recipe.title}
          image={recipe.image}
          onClick={getRecipeId}
        />
        </li>
        )}
      </Draggable>
    );
  });

  function handleOnDragEnd(result) {
    const items = Array.from(favourites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)
    setFavourites(items);
    console.log(result)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="meals">
          {(provided) => (
            <ul className="meals" {...provided.droppableProps} ref={provided.innerRef}>
              {displayFavourites}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}