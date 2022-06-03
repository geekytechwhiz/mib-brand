/* eslint-disable no-debugger */
/* eslint-disable no-debugger */
// Material Dashboard 2 React components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import OMSNavbar from "components/MDNavbar/OMSNavbar";
import Footer from "layouts/footer";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import ActiveOrders from "pages/activeOrders";
import React from "react";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "../../redux/slices/onboarding/index";
import {
  getOrderThunk,
  getReturnsThunk,
} from "../../redux/slices/orders/orderSlice";

function OrderLayout() {
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  dispatch(getOrderThunk(brandId));
  dispatch(getReturnsThunk(brandId));
  const emailId = localStorage.getItem("emailId");
  if (emailId) dispatch(getBrandThunk(emailId));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OMSNavbar />
      <MDBox my={10} pt={1} pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ActiveOrders />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderLayout;
