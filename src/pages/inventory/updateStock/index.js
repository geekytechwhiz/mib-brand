/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cancel, Update } from "@mui/icons-material";
import { Grid, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import * as React from "react";

export default function UpdateStock({ options }) {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [stockInfo, setStockInfo] = React.useState({});
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
      <MDButton
        onClick={handleClickOpen}
        sx={{ padding: "1px" }}
        mx={0}
        variant="text"
        color="error"
      >
        <Icon>edit</Icon>&nbsp;Stock
      </MDButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update order status</DialogTitle>
        <DialogContent>
          <Grid
            container
            display="flex"
            spacing={1}
            justifyContent="center"
            flexDirection="column"
            xs={12}
          >
            <Grid item xs={12}>
              <MDTypography
                display="block"
                variant="button"
                color="text"
                fontWeight="medium"
              >
                Available Stock:&nbsp;&nbsp;&nbsp;
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="regular"
                >
                  {stockInfo.Stock || 0}
                </MDTypography>
              </MDTypography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="row"
              alignContent="center"
            >
              <Grid item xs={3}>
                <MDTypography
                  display="block"
                  variant="button"
                  color="text"
                  fontWeight="medium"
                >
                  New Stock:&nbsp;&nbsp;&nbsp;
                </MDTypography>
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  required
                  type="text"
                  label="New Stock"
                  name="Stock"
                  value={stockInfo.Stock}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="row"
              alignContent="center"
            >
              <Grid item xs={3}>
                <MDTypography
                  display="block"
                  variant="button"
                  color="text"
                  fontWeight="medium"
                >
                  MRP:&nbsp;&nbsp;&nbsp;
                </MDTypography>
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  required
                  type="text"
                  label="MRP"
                  value={stockInfo.MRP}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="row"
              alignContent="center"
            >
              <Grid item xs={3}>
                <MDTypography
                  display="block"
                  variant="button"
                  color="text"
                  fontWeight="medium"
                >
                  Selling Price:&nbsp;&nbsp;&nbsp;
                </MDTypography>
              </Grid>
              <Grid item xs={4}>
                <MDInput
                  required
                  type="text"
                  label="SellingPrice"
                  value={stockInfo.SellingPrice}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDLoadingButton
            color="warning"
            variant="gradient"
            size="small"
            onClick={handleClose}
            endIcon={<Cancel />}
          >
            Cancel
          </MDLoadingButton>
          <MDLoadingButton
            color="success"
            variant="gradient"
            size="small"
            onClick={handleClose}
            endIcon={<Update />}
          >
            Update
          </MDLoadingButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
