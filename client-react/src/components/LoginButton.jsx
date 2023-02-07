import { Button } from "@mui/material"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { authContext } from "Providers/AuthProvider"


export default function LoginButton(props) {
  const { auth, user, login, logout } = useContext(authContext)


  console.log("user check from LoginButton", user);
  return (
    <>
      {!auth &&
        <Button variant="contained" component={Link} to={"login"}>
          Login
        </Button>
      }
      {auth &&
        <Button variant="contained" onClick={logout} component={Link} to={"/"}>
          Logout
        </Button>
      }
    </>
  )
}