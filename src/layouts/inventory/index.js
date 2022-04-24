/* eslint-disable no-unused-vars */
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import Footer from "layouts/footer/index";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/MDNavbar/DashboardNavbar/index";
import Products from "../../pages/Inventory/index";

// Data

function Inventory() {
  const rows = [];
  const [value, setValue] = useState("1");
  let exTabs = [{ label: " ", id: "" }];
  let comboTabs = [{ label: " ", id: "" }];

  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const exclusiveData =
    useSelector((state) => state.inventory?.data?.Exclusive) || [];
  const comboData = useSelector((state) => state.inventory?.data?.Combo) || [];
  const exclusiveKeys = Object.keys(exclusiveData);
  const comboKeys = Object.keys(comboData);
  exTabs = _.map(exclusiveKeys, (val, key) => ({
    id: `${key}`,
    label: `${val}`,
  }));
  comboTabs = _.map(comboKeys, (val, key) => ({
    id: `${key}`,
    label: `${val}`,
  }));
  exTabs = [
    { label: "Tab 1", id: 1 },
    { label: "Tab 2", id: 2 },
  ];
  const data = [];
  const handleAddProduct = () => {
    navigate("/add-product");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <MDButton
            onClick={handleAddProduct}
            color="#007EFF"
            variant="gradient"
            mx={2}
            style={{
              color: "#007EFF",
              borderColor: "#007EFF",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Add New
          </MDButton>
        </div>
      </div>
      <MDBox>
        <Products tabs={exTabs} data={rows} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Inventory;
