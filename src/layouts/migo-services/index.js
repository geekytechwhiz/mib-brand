/* eslint-disable no-debugger */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux-store/slices/onboarding";

function MigoServices() {
  const dispatch = useDispatch();
  const emailId = localStorage.getItem("emailId");
  dispatch(getBrandThunk(emailId));

  setTimeout(() => {}, 3000);
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={1}
      mt={3}
      p={2}
      mb={1}
      textAlign="center">
      <MDTypography variant="caption" fontWeight="medium" color="text">
        No Data Found
      </MDTypography>
    </MDBox>
  );
}

export default MigoServices;
