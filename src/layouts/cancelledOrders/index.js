/* eslint-disable no-debugger */
/* eslint-disable no-debugger */

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import OMSNavbar from "components/MDNavbar/OMSNavbar";
import Footer from "layouts/footer";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import CancelledOrders from "pages/cancelledOrders";
import React from "react";
import { useDispatch } from "react-redux";
import { getCancelledOrdersThunk } from "redux/slices/orders/orderSlice";

function CancelledLayout() {
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  dispatch(getCancelledOrdersThunk(brandId));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OMSNavbar />
      <MDBox my={10} pt={1} pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CancelledOrders />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CancelledLayout;
