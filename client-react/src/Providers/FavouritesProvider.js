import { useState, createContext } from "react";
import axios from "axios";

export const favouritesContext = createContext();

const FavouritesProvider = function (props) {
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = (data) => {
    axios
      .post("/favourites", data)
      .then((res) => {
        setFavourites([...favourites, res.data[0]]);
      })
      .catch((err) => console.error(err));
  };

  const getFavourites = () => {
    axios
      .get(`/favourites`)
      .then((res) => {
        setFavourites([...favourites, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUpdatedFavourites = () => {
    axios
      .get(`/favourites`)
      .then((res) => {
        setFavourites([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFavourite = (recipeid) => {
    axios
      .post(`/api/recipes/delete`, { recipeid })
      .then((res) => {
        getUpdatedFavourites();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isFavourite = (id) => {
    const favIds = favourites.map((favourite) => favourite.recipeid);
    return favIds.includes(id);
  };

  const value = {
    favourites,
    setFavourites,
    saveFavourites,
    getFavourites,
    isFavourite,
    deleteFavourite,
  };

  return (
    <favouritesContext.Provider value={value}>
      {props.children}
    </favouritesContext.Provider>
  );
};

export default FavouritesProvider;
