import * as React from "react";
import { Paper, Box, Grid, Button, Typography } from "@mui/material";
import DropDowns from "./DropDowns";
import RangeSlider from "./RangeSlider";
import { useContext } from "react";
import { searchContext } from "Providers/SearchProvider";
import axios from "axios";

const dietChoices = ["Gluten Free", "Ketogenic", "Vegan", "Vegetarian", "Paleo"]
const intoleranceChoices = ["Dairy", "Egg", "Shellfish", "Seafood", "Peanut", "Soy", "Gluten", "Grain", "Wheat", "Sulfite"]

export default function AdvancedSearch() {

const { diet, setDiet, intolerances, setIntolerances, carbs, setCarbs, fat, setFat, protein, setProtein
} = useContext(searchContext)

const searchData = () => {
  const data = { diet, intolerances, carbs, fat, protein }
  axios.post("/api/search", data)
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
} 



  return (
    <Box sx={{ width: "100%", height: 350 }}>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Typography variant="h5" sx={{ m: 1 }}gutterBottom>
            Advanced Search
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <DropDowns data={dietChoices} name={"Diets"} />
            </Grid>
            <Grid item xs={5}>
              <DropDowns data={intoleranceChoices} name={"Intolerances"} />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                size="large"
                sx={{ m: 1, minWidth: "90%" }}
                onClick={ searchData }
              >
                Search
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ m: 1, p: 2, border: '1px solid lightgrey', borderRadius: 1, width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <RangeSlider
                  name={"Protein"}
                  unit={"grams"}
                  min={0}
                  max={500}
                  caption={
                    "The min and max amount of protein in grams the recipe must have."
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <RangeSlider
                  name={"Fat"}
                  unit={"grams"}
                  min={0}
                  max={100}
                  caption={
                    "The min and max amount of fat in grams the recipe must have."
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <RangeSlider
                  name={"Carbs"}
                  unit={"grams"}
                  min={0}
                  max={100}
                  caption={
                    "The min and max amount of carbohydrates in grams the recipe must have."
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
}
