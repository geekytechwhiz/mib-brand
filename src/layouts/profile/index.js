/* eslint-disable no-debugger */
// Material Dashboard 2 React components
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import Footer from "layouts/footer";
// Material Dashboard 2 React example components
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux/slices/onboarding";
import Profile from "../../pages/profile/index";

function Overview() {
  const dispatch = useDispatch();
  const params = "prashanthmsktm@gmail.com";
  dispatch(getBrandThunk(params));
    
  setTimeout(() => {}, 3000);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Profile />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
