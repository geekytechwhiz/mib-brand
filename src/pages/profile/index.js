/* eslint-disable no-debugger */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import AccountDetails from "./accountDetails";
import ProfileSettings from "./profileSettings";
import SubscriptionPlan from "./subscriptionPlan";

function Profile() {
  const brandInfo = useSelector(
    (state) => state.auth?.accountInfo,
    shallowEqual
  );
  const [value, setValue] = useState("0");
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <MDBox
      textAlign="center"
      height="auto"
      minHeight="100vh"
      maxHeight="auto"
      sx={{ width: "100%", typography: "body1" }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TabContext value={value}>
            <MDBox
              sx={{
                maxWidth: "80%",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <MDTypography variant="button" fontWeight="medium">
                      Account Details
                    </MDTypography>
                  }
                  value="0"
                />
                <Tab
                  label={
                    <MDTypography variant="button" fontWeight="medium">
                      Settings
                    </MDTypography>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <MDTypography variant="button" fontWeight="medium">
                      Subscription Plan
                    </MDTypography>
                  }
                  value="2"
                />
              </TabList>
            </MDBox>
            <TabPanel value="0">
              <AccountDetails data={brandInfo} />
            </TabPanel>
            <TabPanel value="1">
              <ProfileSettings data={brandInfo} />
            </TabPanel>
            <TabPanel value="2">
              <SubscriptionPlan />
            </TabPanel>
          </TabContext>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Profile;
