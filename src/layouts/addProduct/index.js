/* eslint-disable no-debugger */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar/index";
import Footer from "layouts/footer/index";
import SelectCategory from "pages/AddProduct/Category";
import Description from "pages/AddProduct/Description";
import Medias from "pages/AddProduct/Images";
import MoreDetails from "pages/AddProduct/MoreDetails";
// import Images from "pages/AddProduct/Images";
import Offer from "pages/AddProduct/Offer";
import ProductVariant from "pages/AddProduct/ProductVariant";
import VitalInfo from "pages/AddProduct/VitalInfo";
import React, { useState } from "react";
import DashboardLayout from "../layoutContainers/DashboardLayout/index";

function AddProduct() {
  const [value, setValue] = useState("0");
  const handleChange = (e, newValue) => {
    debugger;
    setValue(newValue);
  };
  const switchTabs = (e, val) => {
    setValue(val);
  };

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
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
                  <Tab label="Category" value="0" />
                  <Tab label="Vital info" value="1" />
                  <Tab label="Variations" value="2" />
                  <Tab label="Offer" value="3" />
                  <Tab label="Images" value="4" />
                  <Tab label="Description" value="5" />
                  <Tab label="More Details" value="6" />
                </TabList>
              </MDBox>
              <TabPanel value="0">
                <SelectCategory open activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="1">
                <VitalInfo activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="2">
                <ProductVariant activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="3">
                <Offer activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="4">
                <Medias activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="5">
                <Description activeTab={switchTabs} />
              </TabPanel>

              <TabPanel value="6">
                <MoreDetails activeTab={switchTabs} />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>

        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default AddProduct;
