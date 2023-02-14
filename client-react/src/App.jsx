import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
// import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from "@mui/material/IconButton";
// import Typography from '@mui/material/Typography';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import Container from '@mui/material/Container';
import Avatar from "@mui/material/Avatar";
// import Button from '@mui/material/Button';
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { authContext } from "./Providers/AuthProvider";

import LoginForm from "components/LoginForm";

//Pages
import Recipes from "./pages/Recipes";
import Groceries from "pages/Groceries";
import RecipeDetails from "./components/RecipeDetails";
import Favourites from "pages/Favourites";
import MealPlanner from "pages/MealPlanner";
import SignUp from "./pages/SignUp";

const pages = ["Recipes", "Groceries", "Favourites", "Planner"];
const urls = ["/", "grocery-list", "favourites", "mealplanner"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="#">
//         Saffron
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const theme = createTheme({
  palette: {
    primary: {
      main: '#734060'
    },
    background: {
      default: "#f7fafc"
    }
  }
});

export default function App() {
  const { auth, user } = useContext(authContext);
  const [recipes, setRecipes] = useState({});
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const recipeId = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => {
        setRecipes({ error: err.message });
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Saffron
          </Typography>
        </Toolbar>
      </AppBar> */}

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Sacramento",
                fontSize: "2.5rem",
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Saffron
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    component={Link}
                    to={urls[index]}
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Saffron
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <Button
                  component={Link}
                  to={urls[index]}
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!auth && (
                <Button
                  variant="text"
                  component={Link}
                  to={"login"}
                  sx={{ color: "white", p: 0, textTransform: "none" }}
                >
                  Login
                </Button>
              )}
              {!auth && (
                <Button
                  variant="text"
                  component={Link}
                  to={"signup"}
                  sx={{ color: "white", p: 0, textTransform: "none" }}
                >
                  Sign Up
                </Button>
              )}
              {auth && (
                <Typography component="span" sx={{ mr: 1, p: 0 }}>{user.email}</Typography>
              )}
              {auth && (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ ml: 2, p: 0 }}>
                    <Avatar alt="user" src="" />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <main>
                  
          <Container sx={{ py: 8 }} maxWidth="lg">
            <Paper elevation={3} sx={{p: 3, borderRadius: 3}} >
              <Routes>
                <Route
                  path="/"
                  element={<Recipes recipes={recipes} advSearch={isVisible} />}
                />
                <Route path="/receipes/:id" element={<RecipeDetails />} />
                <Route path="/grocery-list" element={<Groceries />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/mealplanner" element={<MealPlanner />} />
              </Routes>
            </Paper>
          </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box> */}
      {/* End footer */}
    </ThemeProvider>
  );
}
