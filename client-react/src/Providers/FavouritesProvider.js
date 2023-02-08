import { useState, createContext } from 'react';
import axios from 'axios';

export const favouritesContext = createContext();

const FavouritesProvider = function (props) {


  const [favourites, setFavourites] = useState([])
  const [favouriteIds, setFavouriteIds] = useState([])

  const saveFavourites = (data) => {
    console.log("data check saveFavourites", data)
    axios.post('/favourites', data)
      .then(res => {
        console.log("axios check result after database favourites", res.data)
        setFavourites([...favourites, res.data[0]])
      })
      .catch(err => console.error(err))
  }

  const getFavourites = () => {
    axios.get(`/favourites`)
      .then((res) => {
        console.log("favourites check from getFavoruites function", res.data)
        setFavourites([...favourites, ...res.data]);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isFavourite = (id) => {
    const favIds = favourites.map((favourite) => favourite.recipeid)
    return favIds.includes(id)
  }




  const value = { favourites, setFavourites, saveFavourites, getFavourites, isFavourite }

  return (
    <favouritesContext.Provider value={value}>
      {props.children}
    </favouritesContext.Provider>
  )

}

export default FavouritesProvider;