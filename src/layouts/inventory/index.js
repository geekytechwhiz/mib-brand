/* eslint-disable no-unused-vars */
import MDBox from "components/MDBox";
import Footer from "layouts/footer/index";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import React from "react";
import { useDispatch } from "react-redux";
import DashboardNavbar from "../../components/MDNavbar/DashboardNavbar/index";
import Products from "../../pages/inventory/index";
import { getProductsThunk } from "../../redux/slices/inventory/index";

function Inventory() {
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  dispatch(getProductsThunk(brandId));
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <Products />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Inventory;
