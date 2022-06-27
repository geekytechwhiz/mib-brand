/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import _ from "lodash";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ExclusiveTab from "../exclusiveTab";

export default function InactiveProducts() {
  let exTabs = [];
  let exData = [];
  let comboTabs = [];
  const inventoryData =
    useSelector((state) => state.inventory?.inActiveProducts, shallowEqual) ||
    null;
  if (inventoryData && Object.keys(inventoryData).length > 0) {
    exData = inventoryData.Exclusive;
    const exKeys = Object.keys(inventoryData.Exclusive || {}) || [];
    const comboKeys = Object.keys(inventoryData.Combo || {}) || [];
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
      <ExclusiveTab isActive={false} data={exData} tabs={exTabs} />
    </MDBox>
  );
}
