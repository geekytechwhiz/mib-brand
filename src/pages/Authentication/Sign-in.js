/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// @mui material components

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { useMaterialUIController, setLayout } from 'context';

import { useNavigate, Link } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [controller, dispatch] = useMaterialUIController();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSiginClick = () => {
    debugger;
    setLayout(dispatch, 'dashboard');
    navigate('/dashboard');
  };
  useEffect(() => {
    setLayout(dispatch, 'dashboard');
  }, []);

  return (
    <Card>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput type="email" label="Email" fullWidth />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="password" label="Password" fullWidth />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              onClick={handleSetRememberMe}
              sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
            >
              &nbsp;&nbsp;Remember me
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleSiginClick}
              color="info"
              fullWidth
            >
              sign inn
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{' '}
              <MDTypography
                component={Button}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
                onClick={() => navigate('/authentication/sign-up')}
              >
                Sign up
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SignIn;
