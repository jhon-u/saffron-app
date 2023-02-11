import {useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { recipeDetailsContext } from '../../Providers/RecipeDetailsProvider';
import Ingredients from '../RecipeDetails/Ingredients';
import ModalIngredients from './ModalIngredients';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ModalList() {
  const { ingredients, openGroceriesModal, setOpenGroceriesModal } = useContext(recipeDetailsContext);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpenGroceriesModal(false);

  console.log('INGREDIENTS AT ModalList', ingredients)

  return (
    <Box>
      <Modal
        open={openGroceriesModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add to Grocery List
          </Typography>
          <ModalIngredients />
        </Box>
      </Modal>
    </Box>
  );
}