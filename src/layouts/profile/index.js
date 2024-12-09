/* eslint-disable no-debugger */

import MDBox from "components/MDBox";
import Profile from "pages/profile";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux-store/slices/onboarding";

function ProfileLayout() {
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
      <Profile />
    </MDBox>
  );
}

export default ProfileLayout;
