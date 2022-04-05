/* eslint-disable no-unused-vars */
import { Checkbox } from '@mui/material';
import Card from '@mui/material/Card';
// // Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [hasLoginButton, sethasLoginButton] = useState(false);
  return (
    <Card>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput type="text" label="Name" variant="standard" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="email" label="Email" variant="standard" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Password"
              variant="standard"
              fullWidth
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Checkbox />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              Terms and Conditions
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="info" fullWidth>
              sign in
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Already have an account?{' '}
              <MDTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign In
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Signup;
