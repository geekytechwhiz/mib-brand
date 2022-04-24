/* eslint-disable no-debugger */
import MDBox from "components/MDBox";
import React from "react";
// import BankInfo from "./BankInfo";
// import BusinessInfo from "./BusinessInfo";
import ContactDetails from "./ContactInfo";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  return (
    <MDBox>
      <ProfileHeader />
      <ContactDetails />
      {/* <BusinessInfo />
      <BankInfo /> */}
    </MDBox>
  );
}

export default Profile;
