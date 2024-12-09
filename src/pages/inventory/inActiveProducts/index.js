/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import _ from "lodash";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ProductList from "../productList";

export default function InactiveProducts() {
  let tabs = [];
  const inventoryData =
    useSelector((state) => state.inventory?.inActiveProducts, shallowEqual) ||
    null;
  if (inventoryData && Object.keys(inventoryData).length > 0) {
    const keys = Object.keys(inventoryData || {}) || [];
    tabs =
      keys &&
      _.map(keys, (val, key) => ({
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
      sx={{ width: "100%", typography: "body1" }}>
      <ProductList isActive={false} data={inventoryData} tabs={tabs} />
    </MDBox>
  );
}
