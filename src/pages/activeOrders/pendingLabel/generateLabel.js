/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MDTypography from "components/MDTypography";
import _ from "lodash";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import BillingLabelInfo from "./billingLabelInfo";

function GenerateBillingLabel({ hasOpen, orders, brandInfo, hasShow, name }) {
  const selectedOrders = useSelector(
    (state) => state.orderState.selectedOrders
  );

  // if (selectedOrders && selectedOrders.length > 0) {
  //   data = _.filter(orders, (x) => _.includes(selectedOrders, x.OrderId));
  // }
  const [open, setOpen] = React.useState(hasOpen);
  const [optDisable, setDisable] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setDisable(true);
  });
  return (
    <>
      <Button
        color="dark"
        sx={{ color: "black" }}
        variant="contained"
        mx={2}
        onClick={handleClickOpen}
        disabled={hasShow}
      >
        {name}
      </Button>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
          <MDTypography variant="button" fontWeight="medium">
            Billing Label
          </MDTypography>
          {optDisable ? (
            <BillingLabelInfo orders={selectedOrders} brandInfo={brandInfo} />
          ) : (
            <></>
          )}
        </DialogTitle>
      </Dialog>
    </>
  );
}

export default memo(GenerateBillingLabel);
