import * as React from "react";
import { Paper, Box, Grid, Button, Typography } from "@mui/material";
import DropDowns from "./DropDowns";
import RangeSlider from "./RangeSlider";

export default function AdvancedSearch() {
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
              <DropDowns name={"Diet"} />
            </Grid>
            <Grid item xs={5}>
              <DropDowns name={"Intolerance"} />
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                size="large"
                sx={{ m: 1, minWidth: "90%" }}
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
