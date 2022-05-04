/* eslint-disable no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Footer from "layouts/footer/index";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import React from "react";
import { useDispatch } from 'react-redux';
import DashboardNavbar from "../../components/MDNavbar/DashboardNavbar/index";
import Products from "../../pages/Inventory/index";
import { getProductsThunk } from '../../redux/slices/inventory/index'; 

function Inventory() { 
  const dispatch = useDispatch();
  const brandId= localStorage.getItem("brandId")
  dispatch(getProductsThunk(brandId)); 
  const handleAddProduct = () => {
    navigate("/add-product");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar /> 
      <MDBox>
        <Products/>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Inventory;
