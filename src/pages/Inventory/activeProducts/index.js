/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import _ from "lodash";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExclusiveTab from "../exclusiveTab";

export default function ActiveProducts() {
  const navigate = useNavigate();
  let exTabs = [];
  let exData = [];
  let comboTabs = [];

  const inventoryData =
    useSelector((state) => state.inventory?.products, shallowEqual) || null;

  if (inventoryData && Object.keys(inventoryData).length > 0) {
    exData = inventoryData.Exclusive;
    const exKeys = Object.keys(inventoryData.Exclusive) || [];
    const comboKeys = Object.keys(inventoryData.Combo) || [];
    exTabs =
      exKeys &&
      _.map(exKeys, (val, key) => ({
        id: `${key + 1}`,
        label: `${val}`,
      }));
    comboTabs =
      comboKeys &&
      _.map(comboKeys, (val, key) => ({
        id: `${key + 1}`,
        label: `${val}`,
      }));
  }
  const handleAddNew = () => {
    navigate("/add-product", {
      state: {
        productId: "",
      },
    });
  };

  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      p={2}
      mb={1}
      textAlign="center"
      height="100vh"
      overflow="scroll"
      sx={{ width: "100%", typography: "body1" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <MDButton
            onClick={handleAddNew}
            color="#007EFF"
            variant="gradient"
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

      <ExclusiveTab isActive data={exData} tabs={exTabs} />
    </MDBox>
  );
}
