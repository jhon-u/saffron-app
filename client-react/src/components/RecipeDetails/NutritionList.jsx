
import { useContext } from "react"
import { recipeDetailsContext } from "../../Providers/RecipeDetailsProvider";
import { Box } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function NutritionList(props) {
  const { recipeDetails } = useContext(recipeDetailsContext)
  const nd = recipeDetails.nutrition

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }


  const rows = [
    createData('Calories (kcal)', nd.Calories.amount, nd.Calories.percentOfDailyNeeds),
    createData('Carbohydrates (g)', nd.Carbohydrates.amount, nd.Carbohydrates.percentOfDailyNeeds),
    createData('Fat (g)', nd.Fat.amount, nd.Fat.percentOfDailyNeeds),
    createData('Fiber (g)', nd.Fiber.amount, nd.Fiber.percentOfDailyNeeds),
    createData('Protein (g)', nd.Protein.amount, nd.Protein.percentOfDailyNeeds),
    createData('Sodium (mg)', nd.Sodium.amount, nd.Sodium.percentOfDailyNeeds),
    createData('Sugar (g)', nd.Sugar.amount, nd.Sugar.percentOfDailyNeeds)
  ];

  return (
    <>
      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Per Serving</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">% of Daily Needs</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}