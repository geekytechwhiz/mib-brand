/* eslint-disable no-debugger */
/* eslint-disable no-debugger */
// Material Dashboard 2 React components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import OMSNavbar from "components/MDNavbar/OMSNavbar";
import Footer from "layouts/footer";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import ReturnOrder from "pages/returns/index";
import React from "react";

function ReturnsLayout() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <OMSNavbar />
      <MDBox my={10} pt={1} pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ReturnOrder />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ReturnsLayout;
