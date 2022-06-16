/* eslint-disable no-debugger */

import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import Footer from "layouts/footer";
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import Profile from "pages/profile";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux/slices/onboarding";

function ProfileLayout() {
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
        textAlign="center"
      >
        <Profile />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProfileLayout;
