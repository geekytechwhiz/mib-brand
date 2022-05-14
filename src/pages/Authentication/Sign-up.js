/* eslint-disable import/no-named-as-default */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { Checkbox } from "@mui/material";
import Card from "@mui/material/Card";
// // Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useEffect, useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link, useNavigate } from "react-router-dom";
import { Validate } from "../../lib/validations/index";
import { SIGN_UP_REQUIRED_FIELDS } from "../../lib/constants/index";
import registerAccount from "../../services/onboarding/index";

function Signup() {
  const formRef = useRef("form");
  const [disabled, setDisabled] = useState(true);

  const [user, setUser] = useState({});
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    const validate = Validate(SIGN_UP_REQUIRED_FIELDS, user);
    if (!validate.isValid) {
      return false;
    }
    const req = {
      EmailId: user.EmailId,
      Password: user.Password,
      ContactDetails: {
        Name: user.Name,
        Mobile: user.Mobile,
        EmailId: user.EmailId,
        CountryCode: "+91",
        Languages: ["English"],
      },
    };
    const res = await registerAccount(req);

    if (res) {
      // setLayout(dispatch, "dashboard");
      navigate("/add-product", { state: { path: "add" } });
    }
  };

  const handleTerms = (e) => {
    const isChecked = e.target.checked;
    setDisabled(isChecked);
  };

  return (
    <ValidatorForm formRef="form" onSubmit={handleSubmit}>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <MDBox mb={2}>
              <TextValidator
                label="Your Name"
                name="Name"
                required
                fullWidth
                value={user.Name}
                validators={["required", "text"]}
                errorMessages={["this field is required"]}
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextValidator
                label="Mobile Number"
                name="Mobile"
                required
                value={user.Mobile}
                fullWidth
                errorMessages={[
                  "this field is required",
                  "Mobile is not valid",
                ]}
                validators={["required", "minNumber:10"]}
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextValidator
                required
                label="Email"
                value={user.EmailId}
                name="EmailId"
                fullWidth
                validators={["required", "isEmail"]}
                errorMessages={["this field is required", "email is not valid"]}
                onChange={handleChange}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextValidator
                required
                label="Password"
                type="password"
                name="Password"
                value={user.Password}
                fullWidth
                validators={["required"]}
                errorMessages={[
                  "this field is required",
                  "Password must be at least 6 characters",
                ]}
                onChange={handleChange}
              />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Password must be at least 6 characters &nbsp;
              </MDTypography>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                size="small"
                color="success"
                onChange={handleTerms}
                defaultChecked={false}
                checked={disabled}
              />
              <MDTypography
                variant="button"
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
                type="submit"
                variant="gradient"
                color="info"
                disabled={!disabled}
                fullWidth
                onClick={handleSubmit}
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
    </ValidatorForm>
  );
}

export default Signup;
