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
  ) || {
    BusinessDetails: {},
    BankDetails: {},
    ContactDetails: {},
    BillingDetails: {},
  };
  return (
    <MDBox>
      <ProfileHeader data={brandInfo} />
      {/* <ContactDetails data={brandInfo.ContactDetails} />
      <BusinessInfo data={brandInfo.BusinessDetails} />
      <BillingInfo data={brandInfo.BillingDetails} />
      <BankInfo data={brandInfo.BankDetails} />
      <VerifyDocuments /> */}
      <ProfileDetails data={brandInfo} />
    </MDBox>
  );
}

export default Profile;
