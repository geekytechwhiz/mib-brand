import MDBox from 'components/MDBox';
import React from 'react';
import ContactInfo from './ContactInfo';
import BusinessDetails from './BusinessDetails';
import BankDetails from './BankDetails';

function Profile() {
  return (
    <MDBox>
      <ContactInfo />
      <BusinessDetails />
      <BankDetails />
    </MDBox>
  );
}

export default Profile;
