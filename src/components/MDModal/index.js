/* eslint-disable no-unused-vars */
// Material Dashboard 2 React components
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// @mui material components
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";

function MDModal({ enabled, ...rest }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  // The base template for the alert
  return (
    <Modal
      keepMounted
      {...rest}
      onClose={handleClose}
      aria-labelledby="mdModal"
      aria-describedby="mdModalDescription"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        <CircularProgress color="white" />
      </Box>
    </Modal>
  );
}

// Setting default values for the props of MDAlert
MDModal.defaultProps = {
  enabled: false,
};

// Typechecking props of the MDAlert
MDModal.propTypes = {
  enabled: PropTypes.bool,
};

export default MDModal;
