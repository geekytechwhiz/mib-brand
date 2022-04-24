/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// @mui material components

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { setLayout, useMaterialUIController } from "context";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/onboarding";
import { getBrandThunk } from "../../redux/slices/onboarding";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialRoutesSetRef = useRef(false);
  const token = localStorage.getItem("token");
  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState({});

  const [controller, contextDispatch] = useMaterialUIController();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSignInClick = async () => {
    debugger;
    // const res = await login(user);
    const response = await login(user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("auth", true);
    localStorage.setItem("emailId", user.EmailId);
    dispatch(getBrandThunk(user.EmailId));
    setLayout(contextDispatch, "dashboard");
    navigate("/dashboard");
  };

  useEffect(() => {
    debugger;
    if (!initialRoutesSetRef.current) {
      if (token) {
        initialRoutesSetRef.current = true;
        // navigate("/dashboard");
      } else {
        initialRoutesSetRef.current = true;
        // navigate("/authentication/sign-in");
      }
    }
  }, [user, navigate]);

  return (
    <Card>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              fullWidth
              name="EmailId"
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Password"
              fullWidth
              name="Password"
              onChange={handleChange}
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
            >
              &nbsp;&nbsp;Remember me
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              onClick={handleSignInClick}
              color="info"
              fullWidth
            >
              Sign inn
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Don&apos;t have an account?{" "}
              <MDTypography
                component={Button}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
                onClick={() => navigate("/authentication/sign-up")}
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
