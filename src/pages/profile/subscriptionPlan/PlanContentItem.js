import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";

// eslint-disable-next-line react/prop-types
function PlanContentItem({ content }) {
  return (
    <MDBox
      width="100%"
      bgColor="transparent"
      display="flex"
      alignItems="center"
      marginBottom="2%"
    >
      <MDBox
        width="10px"
        height="10px"
        bgColor="white"
        color="white"
        borderRadius="100%"
        marginRight="10px"
      >
        &nbsp;
      </MDBox>
      <MDTypography fontSize="0.9rem" color="white">
        {content}
      </MDTypography>
    </MDBox>
  );
}

export default PlanContentItem;
