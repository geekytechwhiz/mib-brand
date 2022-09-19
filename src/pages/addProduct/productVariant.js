/* eslint-disable dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Save } from "@mui/icons-material";
import { Autocomplete, Button, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDPanel from "components/MDPanel";
import DynamicForm from "lib/dynamicForm";
import _ from "lodash";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getVariantDetails } from "../../lib/helper";

function ProductVariant(props) {
  const { data, activeTab } = props;
  const initialVariants = data.variants || [];
  const [variant, setVariant] = useState({ primary: "", secondary: "" });
  const [variants, setVariants] = useState(initialVariants);
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
  const dataset = useMemo(() => getVariantDetails(category), [details]);

  // useEffect(() => {
  //   setData(details);
  // }, [formData]);

  const handleOnChange = useCallback((event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;

    // setVariants(values);
  });
  const handleSave = useCallback((event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    const values = _.cloneDeep(variants);

    const obj = { id: values.length + 1, point: value };
    values.push(obj);
    setVariants(values);
  });

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
