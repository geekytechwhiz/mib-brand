import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import MDBox from 'components/MDBox';
import Footer from 'examples/Footer';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import AdditionalInfo from 'pages/AddProduct/AdditionalInfo';
import ProductVariant from 'pages/AddProduct/ProductVariant';
import React, { useState } from 'react';
import Pricing from '../../pages/AddProduct/Pricing';
import ProductDetailsPanel from '../../pages/AddProduct/ProductDetailsPanel';

function AddProduct() {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
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
                  maxWidth: '80%',
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Product Details" value="1" />
                  <Tab label="Description" value="2" />
                  <Tab label="Additional Info" value="3" />
                  <Tab label="Pricing And Shipping" value="4" />
                </TabList>
              </MDBox>
              <TabPanel value="1">
                <ProductDetailsPanel activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="2">
                <ProductVariant activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="3">
                <AdditionalInfo activeTab={switchTabs} />
              </TabPanel>
              <TabPanel value="4">
                <Pricing />
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
