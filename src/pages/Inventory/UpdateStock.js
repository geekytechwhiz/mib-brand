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
  paddingBottom: "20px",
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
    <div>
      <BottomContain>
        <UpdateStockLink onClick={handleClickOpen}>
          Update Stock
        </UpdateStockLink>
        <div role="presentation" onClick={handleClickOpen}>
          <AddIcon />
        </div>
      </BottomContain>
      <Dialog open={open} onClose={handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <DialogTitle>Update Stocks</DialogTitle>
          </div>
          <div role="presentation" onClick={handleClose} style={{ margin: 10 }}>
            <CancelRoundedIcon />
          </div>
        </div>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 30,
              marginRight: 30,
              marginTop: 30,
              justifyContent: "center",
              lineHeight: 5,
            }}
          >
            <div>
              <TextField
                size="small"
                type="number"
                id="outlined-required"
                label="Buddy margin"
              />
            </div>
            <div>
              <TextField
                type="number"
                size="small"
                id="outlined-required"
                label="Migo Loyalty Point"
              />
            </div>
            <div style={{ lineHeight: 2 }}>
              <TextField
                type="number"
                size="small"
                id="outlined-required"
                label="Stock"
              />
            </div>
          </div>
        </DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 30,
          }}
        >
          <Button variant="contained" onClick={handleClose}>
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
