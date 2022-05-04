/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";

const UpdateStockLink = styled(Typography)({
  fontSize: "0.9rem", 
  marginRight: 2,
});

const BottomContain = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "5px",
});

export default function UpdateStock(props) {
  const { hasOpen } = props;
  const [open, setOpen] = React.useState(hasOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BottomContain>
        <UpdateStockLink onClick={handleClickOpen}>
          Update Stock   <AddIcon />
        </UpdateStockLink> 
      </BottomContain> 
    </>
  );
}
