/* eslint-disable react/prop-types */
import MDBox from "components/MDBox";
import React from "react";
import ProfileDetails from "./profileDetails";
import ProfileHeader from "./ProfileHeader";

function AccountDetails({ data }) {
  return (
    <MDBox>
      <ProfileHeader data={data} />
      <ProfileDetails data={data} />
    </MDBox>
  );
}

export default AccountDetails;
