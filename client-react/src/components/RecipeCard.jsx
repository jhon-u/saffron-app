import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { favouritesContext } from "Providers/FavouritesProvider";

export default function RecipeCard(props) {
  const { saveFavourites, isFavourite, deleteFavourite } =
    useContext(favouritesContext);

  const handleFavouriteState = (recipeid) => {
    if (isFavourite(recipeid)) {
      deleteFavourite(recipeid);
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
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            S
          </Avatar>
        }
        title={props.title}
      />
      <NavLink to={`/receipes/${props.id}`} state={props.id}>
        <CardMedia
          component="img"
          height="194"
          image={props.image}
          alt={props.title}
        />
      </NavLink>
      <CardContent></CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleFavouriteState(props.id)}
        >
          {isFavourite(props.id) && <FavoriteIcon style={{ color: "red" }} />}
          {!isFavourite(props.id) && <FavoriteIcon />}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
