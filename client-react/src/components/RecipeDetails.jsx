import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RecipeDetails(props) {
  const [recipeDetails, setRecipeDetails] = useState({});
  useEffect(() => {
    axios.get(`/api/recipes/:${props.id}`)
      .then((res) => {
        console.log('RES: ', res)
        setRecipeDetails(res.data);
      })
      .catch((err) => {
        setRecipeDetails({ error: err.message });
      });
  }, []);


  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title"
          variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description"
          sx={{ mt: 2 }}>
          {props.id}
        </Typography>
      </Box>
    </Modal>
  );
}