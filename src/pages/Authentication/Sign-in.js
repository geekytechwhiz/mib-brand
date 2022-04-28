/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// @mui material components

import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { setLayout, useMaterialUIController } from "context";
import React, { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { INVALID_CREDENTIALS } from "../../lib/Constants";
import { getBrandThunk } from "../../redux/slices/onboarding";
import { login } from "../../services/onboarding";

function SignIn() {
  debugger;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef("form");
  const initialRoutesSetRef = useRef(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState({ EmailId: "", Password: "" });
  if (!initialRoutesSetRef.current) {
    if (token) {
      // initialRoutesSetRef.current = true;
      navigate("/dashboard");
    } else {
      initialRoutesSetRef.current = true;
      navigate("/authentication/sign-in");
    }
  }

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

  const handleSubmit = async () => {
    debugger;
    // const res = await login(user);
    debugger;
    if (!user.EmailId || !user.Password) {
      return false;
    }
    const response = await login(user);
    if (!response || !response.token) {
      setError(true);
      return false;
    }
    localStorage.setItem("token", response.token);
    localStorage.setItem("auth", true);
    localStorage.setItem("emailId", user.EmailId);
    dispatch(getBrandThunk(user.EmailId));
    setLayout(contextDispatch, "dashboard");
    navigate("/dashboard");
  };
  if (!initialRoutesSetRef.current) {
    if (token) {
      initialRoutesSetRef.current = true;
      navigate("/dashboard");
    } else {
      initialRoutesSetRef.current = true;
      navigate("/authentication/sign-in");
    }
  }

  return (
    <ValidatorForm formRef="form" onSubmit={handleSubmit}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <MDBox mb={2}>
              <TextValidator
                label="Email"
                fullWidth
                onChange={handleChange}
                name="EmailId"
                value={user.EmailId}
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextValidator
                label="Password"
                fullWidth
                type="password"
                onChange={handleChange}
                name="Password"
                value={user.Password}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              {error ? (
                <MDTypography variant="button" color="error">
                  {INVALID_CREDENTIALS}
                </MDTypography>
              ) : (
                <></>
              )}
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
                onClick={handleSubmit}
                color="info"
                type="submit"
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
    </ValidatorForm>
  );
}

export default SignIn;
