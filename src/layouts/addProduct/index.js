/* eslint-disable no-debugger */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar/index";
import Footer from "layouts/footer/index";
import CustomizedAccordions from "pages/addProduct/category";
import Description from "pages/addProduct/description";
import Medias from "pages/addProduct/images";
import MoreDetails from "pages/addProduct/moreDetails";
import Offer from "pages/addProduct/offer";
import ProductVariant from "pages/addProduct/productVariant";
import VitalInfo from "pages/addProduct/vitalInfo";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import _ from "lodash";
import MDTypography from "components/MDTypography";
import DashboardLayout from "../layoutContainers/DashboardLayout/index";

function addProduct() {
                
  const [value, setValue] = useState("0");
  const { state } = useLocation();
  let productDetails = {};

  if (state && state.productId !== "") {
    const products =
      useSelector((s) => s.inventory?.products[state.type], shallowEqual) || [];
    const productList = products[state.category];
    if (!productList || productList.length === 0) return false;
    productDetails = _.find(
      productList,
      (x) => x.ProductId === state.productId
    );
  }

  console.log("productDetails", productDetails);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const switchTabs = (e, val) => {
    setValue(val);
  };

  return (
    <div>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox
          variant="gradient"
          bgColor="transparent"
          borderRadius="lg"
          coloredShadow="info"
          p={2}
          mb={1}
          textAlign="center"
          height="100vh"
          overflow="scroll"
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
                          Category
                        </MDTypography>
                      }
                      value="0"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          Vital info
                        </MDTypography>
                      }
                      value="1"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          Variations
                        </MDTypography>
                      }
                      value="2"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          Offer
                        </MDTypography>
                      }
                      value="3"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          Images
                        </MDTypography>
                      }
                      value="4"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          Description
                        </MDTypography>
                      }
                      value="5"
                    />
                    <Tab
                      label={
                        <MDTypography variant="button" fontWeight="medium">
                          More Details
                        </MDTypography>
                      }
                      value="6"
                    />
                  </TabList>
                </MDBox>
                <TabPanel value="0">
                  <CustomizedAccordions
                    open
                    data={productDetails}
                    activeTab={switchTabs}
                  />
                </TabPanel>
                <TabPanel value="1">
                  <VitalInfo data={productDetails} activeTab={switchTabs} />
                </TabPanel>
                <TabPanel value="2">
                  <ProductVariant
                    data={productDetails}
                    activeTab={switchTabs}
                  />
                </TabPanel>
                <TabPanel value="3">
                  <Offer data={productDetails} activeTab={switchTabs} />
                </TabPanel>
                <TabPanel value="4">
                  <Medias data={productDetails} activeTab={switchTabs} />
                </TabPanel>
                <TabPanel value="5">
                  <Description data={productDetails} activeTab={switchTabs} />
                </TabPanel>

                <TabPanel value="6">
                  <MoreDetails data={productDetails} activeTab={switchTabs} />
                </TabPanel>
              </TabContext>
            </Grid>
          </Grid>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </div>
  );
}

export default addProduct;
