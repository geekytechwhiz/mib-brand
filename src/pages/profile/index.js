/* eslint-disable no-debugger */
import MDBox from "components/MDBox";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import ProfileDetails from "./profileDetails";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  const brandInfo = useSelector(
    (state) => state.auth?.accountInfo,
    shallowEqual
  );
  return (
    <MDBox>
      <ProfileHeader data={brandInfo} />
      <ProfileDetails data={brandInfo} />
    </MDBox>
  );
}

export default Profile;
