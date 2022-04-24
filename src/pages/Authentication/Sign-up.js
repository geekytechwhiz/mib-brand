/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { Checkbox } from "@mui/material";
import Card from "@mui/material/Card";
// // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMaterialUIController, setLayout } from "context";
import registerAccount from "../../services/onboarding/index";

function Signup() {
  const [disabled, setDisabled] = useState(true);
  const [controller, dispatch] = useMaterialUIController();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  // const details = useSelector((state) => state.data);

  useEffect(async () => {
    // const health = await dispatcher(healthCheckThunk());
    // console.log("health", health);
  }, []);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    debugger;
    const res = await registerAccount(user);
    debugger;
    if (res) {
      // setLayout(dispatch, "dashboard");
      navigate("/authentication/sign-in");
    }
  };

  const handleTerms = (e) => {
    const isChecked = !e.target.checked;
    setDisabled(isChecked);
  };

  return (
    <Card>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              name="EmailId"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="password"
              label="Password"
              name="Password"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
          </MDBox>
          <MDBox display="flex" alignItems="center" ml={-1}>
            <Checkbox onChange={handleTerms} />
            <MDTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
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
            <MDButton
              variant="gradient"
              color="info"
              disabled={disabled}
              fullWidth
              onClick={handleSignUp}
            >
              sign in
            </MDButton>
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              Already have an account?{" "}
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
