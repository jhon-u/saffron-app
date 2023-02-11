import MealPlans from "components/MealPlans";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "helpers/StrictMode.Droppable";
import { useContext, useNavigate } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import RecipeCard from "components/RecipeCard";
import { authContext } from "Providers/AuthProvider"
import LoginForm from "components/LoginForm";

function MealPlanner() {
  const { favourites } = useContext(favouritesContext)

  const itemsFromBackend = favourites;
  const columnsFromBackend = {
    [1]: {
      name: "Favourites",
      items: itemsFromBackend
    },
    [2]: {
      name: "Monday",
      items: []
    },
    [3]: {
      name: "Tuesday",
      items: []
    },
    [4]: {
      name: "Wednesday",
      items: []
    },
    [5]: {
      name: "Thursday",
      items: []
    },
    [6]: {
      name: "Friday",
      items: []
    },
    [7]: {
      name: "Saturday",
      items: []
    },
    [8]: {
      name: "Sunday",
      items: []
    }

  };
  
  const [columns, setColumns] = useState(columnsFromBackend);
  const { auth, user } = useContext(authContext)

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const getRecipeId = (id) => {
    setRecipeId(id)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%", flexWrap: "wrap" }}>
    {auth && (
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center" 
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8, overflow: "scroll",
                height: "500px" }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <RecipeCard
                                      // key={recipe.id}
                                      id={item.recipeid}
                                      title={item.title}
                                      image={item.image}
                                      onClick={getRecipeId}
                                    />
                                    {/* {item.title} */}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    )}
    {!auth && (
      <div className="recipeList">
        <LoginForm path={"/favourites"}/>
      </div>
    )}
    </div>
  );
}

export default MealPlanner;
