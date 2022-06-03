/* eslint-disable no-debugger */
// Material Dashboard 2 React components
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import Footer from "layouts/footer";
// Material Dashboard 2 React example components
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import Profile from "pages/profile";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux/slices/onboarding";
// import Profile from "../../pages/profile/index";

function ProfileLayout() {
  const dispatch = useDispatch();
  const emailId = localStorage.getItem("emailId");
  dispatch(getBrandThunk(emailId));

  setTimeout(() => {}, 3000);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Profile />
      <Footer />
    </DashboardLayout>
  );
}

export default ProfileLayout;
