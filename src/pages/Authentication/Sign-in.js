/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// @mui material components

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { setLayout, useMaterialUIController } from "context";
import React, { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { responseValidator } from "lib/helper";
import { getBrandThunk } from "../../redux/slices/onboarding";
import { login } from "../../services/onboarding";

function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef("form");
  const initialRoutesSetRef = useRef(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState({ message: "", isValid: false });

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
    setIsLoading(true);
    if (!user.EmailId || !user.Password) {
      return false;
    }
    const response = await login(user);
    if (response && response.auth) {
      setIsLoading(false);
      localStorage.setItem("token", response.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("emailId", user.EmailId);
      dispatch(getBrandThunk(user.EmailId));
      setLayout(contextDispatch, "dashboard");
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      const validate = responseValidator(response.status);
      if (!validate.isValid) {
        setError(validate);
      }
      return false;
    }
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
  const alertContent = (message) => (
    <MDBox>
      <MDTypography variant="body2" color="white">
        {message}&nbsp;&nbsp;&nbsp;
      </MDTypography>
    </MDBox>
  );

  return (
    <ValidatorForm formRef="form" onSubmit={handleSubmit}>
      {state?.register ? (
        <MDAlert color="success" dismissible>
          {alertContent("Account has been created successfully!!")}
        </MDAlert>
      ) : (
        <></>
      )}
      <MDBox pt={4} pb={1} mt={10} px={3}>
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
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
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
              <MDBox display="flex" alignItems="center" ml={1}>
                {error.isValid ? (
                  <MDTypography
                    variant="caption"
                    fontWeight="medium"
                    color="error"
                  >
                    {error.message}
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
              <MDBox mt={4} mb={0}>
                <MDLoadingButton
                  onClick={handleSubmit}
                  loading={isLoading}
                  color="primary"
                  loadingPosition="start"
                  startIcon={<LoginRoundedIcon />}
                  variant="gradient"
                  fullWidth
                  mx={2}
                  name="login"
                >
                  Sign in
                </MDLoadingButton>
              </MDBox>
              <MDBox mt={1} textAlign="left">
                <MDTypography
                  component={Button}
                  to="/authentication/reset-password"
                  variant="caption"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={() => navigate("/authentication/reset-password")}
                >
                  Forgot password
                </MDTypography>
              </MDBox>

              <MDBox mt={1} textAlign="right">
                <MDTypography variant="caption" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Button}
                    to="/authentication/sign-up"
                    variant="caption"
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
      </MDBox>
    </ValidatorForm>
  );
}

export default SignIn;
