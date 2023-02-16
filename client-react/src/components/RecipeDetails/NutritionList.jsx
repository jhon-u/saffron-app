import { useContext } from "react";
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function NutritionList() {
  const { nutrition } = useContext(recipeDetailsContext);
  
  const createRows = () => {
    const results = []
    if( Object.keys(nutrition).length > 0) {
      for(const key of Object.keys(nutrition)) {
        const row = {
          name: key === 'Calories' ? "Calories (kcal)" : key === 'Sodium' ? "Sodium (mg)" : key + ' (g)',
          amount: nutrition[key].amount,
          percentOfDailyNeeds: nutrition[key].percentOfDailyNeeds
        }
    
        results.push(row)
      }
    }

    return results
  };

  const rows = createRows();

  const dataRows = rows?.map((row) => {
    return (
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.percentOfDailyNeeds}</TableCell>
      </TableRow>
    );
  });

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6">Nutrition per serving</Typography>
      <TableContainer component={Paper} variant="outlined" elevation={0}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Per Serving</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">% of Daily Needs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{dataRows}</TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1">
        Percent Daily Values based on a 2,000 calorie diet.
      </Typography>
    </Box>
  );
}
