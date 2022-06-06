/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MDBackdrop from "components/MDBackDrop";
import MDBox from "components/MDBox";
import _ from "lodash";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExclusiveTab from "../exclusiveTab";

export default function InactiveProducts() {
  const navigate = useNavigate();
  let exTabs = [{ label: " ", id: "" }];
  let exData = [];
  let comboTabs = [{ label: " ", id: "" }];

  const inventoryData =
    useSelector((state) => state.inventory?.inActiveProducts, shallowEqual) ||
    null;
  if (inventoryData) {
    exData = inventoryData.Exclusive;
    const exKeys = Object.keys(inventoryData.Exclusive || {}) || [];
    const comboKeys = Object.keys(inventoryData.Combo || {}) || [];
    exTabs = _.map(exKeys, (val, key) => ({
      id: `${key + 1}`,
      label: `${val}`,
    }));
    comboTabs = _.map(comboKeys, (val, key) => ({
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
      {!inventoryData ? (
        <MDBackdrop show />
      ) : (
        <ExclusiveTab isActive={false} data={exData} tabs={exTabs} />
      )}
    </MDBox>
  );
}
