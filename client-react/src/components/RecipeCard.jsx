import { React, useContext, useState } from "react"
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import { favouritesContext } from "Providers/FavouritesProvider";



export default function RecipeCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { saveFavourites, isFavourite, deleteFavourite } =
    useContext(favouritesContext);

  const handleFavouriteState = async (recipeid) => {
    if (isFavourite(recipeid)) {
      await deleteFavourite(recipeid);
    } else {
      saveFavourites({
        recipeid: props.id,
        title: props.title,
        image: props.image,
      });
    }
  };


  return (
    <Card sx={{ maxWidth: 300 }}>
      <div style={{ position: "relative" }}>
        <NavLink to={`/receipes/${props.id}`} state={props.id}>
          <CardMedia style={{ height: "250px", transform: `scale(${isHovered ? 1.2 : 1})`, transition: "transform 0.2s" }}
            component="img"
            height="194"
            image={props.image}
            alt={props.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <div className="title" style={{
            position: "absolute",
            color: "white",
            bottom: ".5em",
            left: "50%",
            fontFamily: "roboto",
            fontWeight: "bold",
            transform: `translate(-50%,0)`,
            width: "90%"
          }}>
            <span style={{ textShadow: "3px 3px 6px rgba(0,0,0,1)" }}>
              {props.title}
            </span>
          </div>
        </NavLink>
        <IconButton
          style={{ position: "absolute", top: ".2em", left: ".2em", color: 'white', boxShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
          aria-label="add to favorites"
          onClick={() => handleFavouriteState(props.id)}
        >
          {isFavourite(props.id) && <FavoriteIcon style={{ color: "red" }} />}
          {!isFavourite(props.id) && <FavoriteIcon />}
        </IconButton>
      </div>
    </Card>
  );
}