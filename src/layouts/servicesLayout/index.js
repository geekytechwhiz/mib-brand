/* eslint-disable no-debugger */

import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import MDTypography from "components/MDTypography";
import Footer from "layouts/footer";
// Material Dashboard 2 React example components
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux-store/slices/onboarding";

function ServicesLayout() {
  const dispatch = useDispatch();
  const emailId = localStorage.getItem("emailId");
  dispatch(getBrandThunk(emailId));

  setTimeout(() => {}, 3000);
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
      <Footer />
    </DashboardLayout>
  );
}

export default ServicesLayout;
