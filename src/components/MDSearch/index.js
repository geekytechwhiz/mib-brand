/* eslint-disable no-unused-vars */
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import * as React from "react";
import SelectedListItem from "./verticalList";

export default function MDSearch() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MDBox sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
      <InputBase
        fullWidth
        sx={{ ml: 1, flex: 1, borderRadius: "lg" }}
        onClick={handleClickOpen}
        onKeyDown={}
        placeholder="Search for your vertical"
        inputProps={{ "aria-label": "search for your vertical" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Dialog maxWidth="lg" open={false} onClose={handleClose} fullWidth>
        <DialogContent fullWidth>
          <MDBox display="flex" flexDirection="row" justifyContent="flex-end">
            <MDInput
              autoFocus
              margin="dense"
              id="name"
              label="Search"
              maxWidth="md"
              type="email"
              variant="standard"
            />
            <IconButton
              size="small"
              type="submit"
              sx={{ p: -10 }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </MDBox>
          <SelectedListItem />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
