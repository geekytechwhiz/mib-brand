/* eslint-disable no-debugger */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import Footer from "layouts/footer";
import { useDispatch } from "react-redux";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
// import { useEffect, useState } from "react";
import { getOrderThunk } from "redux/slices/orders/orderSlice";
import ProcessOrders from "../../pages/orders";
// import { getAllOrders } from "../../services/orders";

function Orders() {
  console.log("OrdersLayour");
  // const brandId = localStorage.getItem("brandId");
  const dispatch = useDispatch();
  dispatch(getOrderThunk("BR1651736511090"));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <ProcessOrders />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Orders;
