import { React, useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import { favouritesContext } from "Providers/FavouritesProvider";
import { loadingContext } from "../Providers/LoadingProvider";

export default function RecipeCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { saveFavourites, isFavourite, deleteFavourite } =
    useContext(favouritesContext);
  const {setLoading} = useContext(loadingContext)

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
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "relative" }}>
        <NavLink to={`/recipes/${props.id}`} state={props.id}>
          <CardMedia
            sx={{
              height: `${props.height}`,
              transform: `scale(${isHovered ? 1.2 : 1.1})`,
              transition: "transform 0.7s",
              objectFit: 'cover',
            }}
            component="img"
            height="214"
            image={props.image}
            alt={props.title}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setLoading(true)}
          />
          <Box
            className="title"
            sx={{
              position: "absolute",
              color: "white",
              bottom: ".5em",
              left: "50%",
              transform: `translate(-50%,0)`,
              width: "90%",
            }}
          >
            <Typography sx={{ textShadow: "0 0 12px rgb(79 79 106 / 6%)", fontWeight: 'bold' }}>
              {props.title}
            </Typography>
          </Box>
        </NavLink>
        <IconButton
          sx={{
            position: "absolute",
            top: ".5em",
            left: ".5em",
            color: "white",
            filter: "drop-shadow(0px 0px 4px 4px rgba(0,0,0,1))",
          }}
          aria-label="add to favorites"
          onClick={() => handleFavouriteState(props.id)}
        >
          {isFavourite(props.id) && <FavoriteIcon sx={{ color: "red" }} />}
          {!isFavourite(props.id) && <FavoriteIcon />}
        </IconButton>
      </Box>
    </Card>
  );
}
