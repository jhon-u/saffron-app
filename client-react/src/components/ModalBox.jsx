import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";

import RecipeDetails from "./RecipeDetails";

export default function ModalBox(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <RecipeDetails
        id={props.id}
        title={props.title}
        open={props.open}
        onClose={props.onClose}
      />
    </Modal>
  );
}
