import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { authContext } from "Providers/AuthProvider"
import { favouritesContext } from "Providers/FavouritesProvider";


export default function LoginButton(props) {
  const { auth, user, login, logout } = useContext(authContext)
  const { setFavourites } = useContext(favouritesContext)

  const handleClick = () => {
    setFavourites([]);
    logout();
  }
  return (
    <>
      {!auth &&
        <Button variant="contained" component={Link} to={"login"}>
          Login
        </Button>
      }
      {auth &&
        <Button variant="contained" onClick={handleClick} component={Link} to={"/"}>
          Logout
        </Button>
      }
    </>
  )
}