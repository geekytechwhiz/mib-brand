/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import DynamicForm from "lib/dynamicForm";
import React, { useEffect, useMemo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getVariantDetails } from "../../lib/helper";

function ProductVariant(props) {
    
  const { activeTab } = props;

  const categories = useSelector(
    (state) => state.inventory.categories,
    shallowEqual
  );
  const category = categories?.ProductCategory || "";
  const [data, setData] = useState({});

  const details = getVariantDetails(category);
  const dataset = useMemo(() => getVariantDetails(category), [data]);
  useEffect(() => {
      
    setData(details);
  }, [data]);

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
      <DynamicForm data={dataset} activeTab={activeTab} />
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
