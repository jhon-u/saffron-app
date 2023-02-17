import MealPlans from "components/MealPlans";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "helpers/StrictMode.Droppable";
import { useContext, useNavigate } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";
import RecipeCard from "components/RecipeCard";
import { authContext } from "Providers/AuthProvider";
import LoginForm from "components/LoginForm";
import { Box, Typography, Grid, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

// import ReactToPrint from 'react-to-print'
import { useReactToPrint } from "react-to-print";

function MealPlanner() {
  const { favourites } = useContext(favouritesContext);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const itemsFromBackend = favourites;
  const columnsFromBackend = {
    [1]: {
      name: "Favourites",
      items: itemsFromBackend,
    },
    [2]: {
      name: "Monday",
      items: [],
    },
    [3]: {
      name: "Tuesday",
      items: [],
    },
    [4]: {
      name: "Wednesday",
      items: [],
    },
    [5]: {
      name: "Thursday",
      items: [],
    },
    [6]: {
      name: "Friday",
      items: [],
    },
    [7]: {
      name: "Saturday",
      items: [],
    },
    [8]: {
      name: "Sunday",
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);
  const { auth, user } = useContext(authContext);

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
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
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
          items: copiedItems,
        },
      });
    }
  };

  const getRecipeId = (id) => {
    setRecipeId(id);
  };

  return (
    <Grid
      container
      item
      xs={12}
      md={12}
      lg={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        flexWrap: "wrap",
      }}
      ref={componentRef}
    >
      <Grid container item xs={12} md={12} lg={12}>
        <Grid item xs={8} md={8} lg={8}>
          <Typography variant="h4" sx={{ mb: 3, color: "#233748" }}>
            Meal Planner
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          md={4}
          lg={4}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button onClick={handlePrint}>
            <PrintIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {auth && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              flexWrap: "wrap",
            }}
          >
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={columnId}
                  >
                    <Box
                      style={{
                        color: "#734060",
                        fontSize: "1.5rem",
                        fontFamily: "Helvetica",
                      }}
                    >
                      {column.name}
                    </Box>
                    <div
                      style={{ margin: 8, overflow: "auto", height: "500px" }}
                    >
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                padding: 4,
                                width: 250,
                                minHeight: 500,
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
                                            // padding: 16,
                                            borderRadius: "25%",
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <RecipeCard
                                            // key={recipe.id}
                                            id={item.recipeid}
                                            title={item.title}
                                            image={item.image}
                                            onClick={getRecipeId}
                                            height={"100px"}
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
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ mb: 10 }}>
        {!auth && <LoginForm path={"/mealplanner"} />}
      </Grid>
    </Grid>
  );
}

export default MealPlanner;
