/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import * as React from "react";

export default function DialogSelect({ options }) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <MDBox fullWidth>
      {/* <Button onClick={handleClickOpen}>Open select dialog</Button> */}
      <MDButton
        onClick={handleClickOpen}
        sx={{ padding: "1px" }}
        mx={0}
        variant="text"
        color="error"
      >
        <Icon>edit</Icon>&nbsp;Update
      </MDButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update order status</DialogTitle>
        <DialogContent>
          <MDBox fullWidth sx={{ display: "flex", flexWrap: "wrap" }}>
            <Select
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              sx={{ width: "80%" }}
              variant="standard"
              options={options}
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
