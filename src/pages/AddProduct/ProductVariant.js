/* eslint-disable dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import DynamicForm from "lib/dynamicForm";
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getVariantDetails } from "../../lib/helper";

function ProductVariant(props) {
  debugger;
  const { data, activeTab } = props;
  let productState = {};
  const keys = Object.keys(data);
  if (keys.length === 0) {
    productState = useSelector(
      (state) => state.inventory.variantDetails,
      shallowEqual
    );
    productState = productState || {};
  } else {
    productState = data;
  }
  // const [product, setProduct] = useState(productState);

  const categories = useSelector(
    (state) => state.inventory.categories,
    shallowEqual
  );
  const category = categories?.ProductCategory || "";
  const [formData, setData] = useState({});

  const details = getVariantDetails(category);
  const dataset = useMemo(() => getVariantDetails(category), [formData]);
  dataset.map((x) => {
    const obj = x;
    obj["value"] = data[x.name];
    return obj;
  });
  debugger;
  useEffect(() => {
    setData(details);
  }, [formData]);

  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={-3}
      mt={-2}
      p={2}
      mb={1}
      textAlign="center"
    >
      <DynamicForm fields={dataset} activeTab={activeTab} />
      <MDBox
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      />
    </MDBox>
  );
}

export default ProductVariant;
