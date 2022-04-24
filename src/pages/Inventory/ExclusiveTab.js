/* eslint-disable react/prop-types */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import * as React from "react";
import CustomCard from "./CustomCard";

const CustomTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingTop: 0,
});

export default function ExclusiveTab(props) {
  const [value, setValue] = React.useState("0");
  const { tabs, data } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MDBox sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <MDBox sx={{ maxWidth: "30%" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ p: 1 }}
          >
            {tabs.map((x) => (
              <Tab label={x.label} value={x.id} />
            ))}
          </TabList>
        </MDBox>
        {tabs.map((x) => (
          <CustomTabPanel sx={{ marginTop: 2 }} value={x.id}>
            <MDBox
              overflowY="scroll"
              variant="gradient"
              minWidth="21.875rem"
              maxWidth="100%"
              maxHeight="100vh"
              shadow="md"
              borderRadius="md"
              p={5}
            >
              <Grid container spacing={2}>
                {data.map((item) => (
                  <Grid item xs={4}>
                    <CustomCard data={item} />
                  </Grid>
                ))}
              </Grid>
            </MDBox>
          </CustomTabPanel>
        ))}
      </TabContext>
    </MDBox>
  );
}
