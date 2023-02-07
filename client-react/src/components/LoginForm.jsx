import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function BasicTextFields() {
  // const submitLogin = () => {
  //   useEffect(() => {
  //     axios
  //       .post("/login")
  //       .then((res) => {
  //         console.log("RES: ", res);
  //         res.json(res.data);
  //       })
  //       .catch((err) => {
  //         console.log({ error: err.message });
  //       });
  //   }, []);
  // }
  
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <br />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      <br />
      <Button variant="contained" onClick={() => {alert('clicked')}}>Login</Button>
    </Box>
  );
}