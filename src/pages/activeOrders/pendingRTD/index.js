/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import { Button, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "components/RTable";
import { ORDER_STATUS_PENDING_HANDOVER } from "constants";
import PendingRTDTable from "lib/tables/activeOrders/pendingRTDTable";
import _ from "lodash";
// import _ from "lodash";
import React, { memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setMarkReadyToDispatch,
  updateOrderThunk,
} from "redux/slices/orders/orderSlice";
import { notification } from "redux/slices/root/rootSlice";
import GenerateBillingLabel from "../pendingLabel/generateLabel";

function ReadyToDispatch({ orders }) {
  let reference = {};
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = React.useState(null);
  const [enabled, setEnabled] = React.useState(true);
  const [count, setCount] = React.useState(0);
  let response = { rows: [], columns: [] };
  const [open, setOpen] = React.useState(false);
  const selectedOrders =
    useSelector((state) => state.orderState.readyToDispatch, shallowEqual) ||
    [];
  response = PendingRTDTable(orders || []);
  const handleClick = (val) => {
    reference = val;
  };

  const getSelectedOrders = () => {
    const length = reference ? Object.keys(reference)?.length : 0;
    if (length < 0) return null;
    const keys = Object.keys(reference);
    const result = _.flatten(
      _.map(keys, (item) => _.filter(response.rows, (x) => x.index == item))
    );
    const res = _.flatten(
      _.map(result, (item) =>
        _.filter(orders, (x) => x.OrderId == item.OrderId)
      )
    );
    return res || {};
  };

  const handleRTD = async () => {
    if (!dateTime || dateTime == "") {
      return false;
    }
    const success = {
      show: true,
      status: "Success",
      title: "Updated Successfully",
      message: "Order has been marked as ready to dispatch!!",
    };

    try {
      const brandId = localStorage.getItem("brandId");
      const orderRequest = selectedOrders?.map((row) => ({
        HandoverTime: dateTime,
        CustomerId: row.CustomerId,
        OrderStatus: ORDER_STATUS_PENDING_HANDOVER,
        OrderId: row.OrderId,
        TrackingId: new Date().getTime(),
      }));
      const request = {
        BrandId: brandId,
        Orders: orderRequest,
      };
      dispatch(updateOrderThunk(request));
      dispatch(notification(success));
      setOpen(false);
    } catch (err) {
      const error = {
        show: true,
        status: "error",
        title: "Update Unsuccessful",
        message: "Something went wrong Please contact support team!!",
      };
      dispatch(notification(error));
      setOpen(false);
    }
  };

  const handleMarkRTD = async () => {
    const length = reference ? Object.keys(reference)?.length : 0;
    if (length > 0) {
      const markedOrders = await getSelectedOrders();
      dispatch(setMarkReadyToDispatch(markedOrders));
      setCount(length);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateTime = (e) => {
    const { value } = e.target;
    setDateTime(value);
  };

  const handleCheckBox = (e) => {
    if (dateTime && dateTime !== "") {
      setEnabled(false);
    } else {
      e.preventDefault();
      setEnabled(true);
    }
  };

  return (
    <div>
      <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
          <MDTypography variant="button" fontWeight="medium">
            Handover Date and Time
          </MDTypography>
          <Grid
            container
            display="flex"
            spacing={2}
            my={2}
            justifyContent="flex-start"
            flexDirection="row"
          >
            <Grid item xs={5}>
              <MDInput
                fullWidth
                id="datetime-local"
                label="Handover Time"
                type="datetime-local"
                defaultValue={new Date()}
                value={dateTime}
                error={!dateTime}
                required
                helperText="Select dispatch date and time"
                onChange={handleDateTime}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={5} />
            <Grid item xs={12} mx={1}>
              <FormControlLabel
                onChange={handleCheckBox}
                control={<Checkbox size="small" onChange={handleCheckBox} />}
                label={
                  <MDTypography
                    style={{ wordWrap: "break-word" }}
                    sx={{
                      display: "box",
                      lineClamp: 0.5,
                      boxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    variant="caption"
                    color="secondary"
                    fontWeight="medium"
                  >
                    {`Are you sure you want to mark the ${count} selected orders as RTD? This action can't be reversed `}
                  </MDTypography>
                }
              />
            </Grid>
            <Grid
              container
              display="flex"
              spacing={1}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item pt={5} mt={5}>
                <Button
                  color="dark"
                  sx={{ color: "black" }}
                  variant="contained"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item pt={5} mt={5}>
                <Button
                  color="dark"
                  sx={{ color: "black" }}
                  variant="contained"
                  disabled={enabled}
                  onClick={handleRTD}
                >
                  Mark RTD
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
      </Dialog>
      <Grid container spacing={1}>
        <Grid item>
          <GenerateBillingLabel
            hasOpen={false}
            orders={orders}
            brandInfo={{}}
            hasShow={false}
            name="Re-print Label"
          />
        </Grid>

        <Grid item>
          <Button
            my={2}
            color="dark"
            sx={{ color: "black" }}
            variant="contained"
            onClick={handleMarkRTD}
          >
            Mark RTD
          </Button>
        </Grid>
      </Grid>
      <DataTable
        table={{ columns: response.columns, rows: response.rows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        isSorted
        onRowSelectStateChange={handleClick}
      />
      {/* <RTD /> */}
    </div>
  );
}

export default memo(ReadyToDispatch);
