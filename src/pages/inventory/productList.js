/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import MDBackdrop from "components/MDBackDrop";
import ProductCard from "./Card/index";

const CustomTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingTop: 0,
  padding: `${0} !important`,
});

export default function ProductList(props) {
  if (!props) return React.Fragment;

  const loading = useSelector((state) => state.root?.loading, shallowEqual);
  const [value, setValue] = React.useState("1");
  const { tabs, data, isActive } = props;
  const products = data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (loading) {
    return <MDBackdrop show />;
  }
  return (
    <MDBox>
      {tabs && tabs.length > 0 ? (
        <TabContext value={value} variant="standard">
          <MDBox sx={{ maxWidth: "100%" }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ p: 1 }}
            >
              {tabs.map((x) => (
                <Tab
                  label={
                    <MDTypography variant="button" fontWeight="medium">
                      {x.label}
                    </MDTypography>
                  }
                  value={x.id}
                />
              ))}
            </TabList>
          </MDBox>
          {tabs.map((x) => (
            <CustomTabPanel sx={{ marginTop: 2 }} value={x.id}>
              <Grid container spacing={1} display="flex" flexDirection="row">
                {products ? (
                  products[x.label]?.map((item) => (
                    <Grid item xs={3}>
                      {item?.ImageLinks[0] ? (
                        <ProductCard
                          isActive={isActive || false}
                          brand={item?.ProductBrand || ""}
                          ratting={item?.Rating || 0}
                          price={item?.SellingPrice || 0}
                          mrp={item?.MRP || 0}
                          productName={item?.ProductName || ""}
                          stock={item?.Stock || 0}
                          image={item?.ImageLinks[0]}
                          type={item?.ProductType || ""}
                          productId={item?.ProductId || ""}
                          category={item?.Category || ""}
                          productCategory={item?.ProductCategory || ""}
                        />
                      ) : (
                        // <MDBox py={0.5} key={index}>
                        //   <MDProductCard
                        //     imgUrl={
                        //       item.ImageUrl ||
                        //       "https://mibuploaddev.s3.ap-south-1.amazonaws.com/inbound/inventory/brand/BR1651736511090/P1651745595431/aa2e4e45-92aa-4166-956b-507d9f6724ad.jpg"
                        //     }
                        //     id={item.ProductId}
                        //     tittle={item.Title}
                        //     price={item.SellingPrice || 0}
                        //     rating={item.Rating}
                        //     hideRating=""
                        //     hoverEffect=""
                        //     discount={item.DiscountPercentage}
                        //     showProductSize=""
                        //   />
                        // </MDBox>
                        // <MDBox py={0.5} key={index}>
                        //   <MDProductCard
                        //     imgUrl={
                        //       item.ImageUrl ||
                        //       "https://mibuploaddev.s3.ap-south-1.amazonaws.com/inbound/inventory/brand/BR1651736511090/P1651745595431/aa2e4e45-92aa-4166-956b-507d9f6724ad.jpg"
                        //     }
                        //     id={item.ProductId}
                        //     tittle={item.Title}
                        //     price={item.SellingPrice || 0}
                        //     rating={item.Rating}
                        //     hideRating=""
                        //     hoverEffect=""
                        //     discount={item.DiscountPercentage}
                        //     showProductSize=""
                        //   />
                        // </MDBox>
                        <></>
                      )}
                    </Grid>
                  ))
                ) : (
                  <></>
                )}
              </Grid>
            </CustomTabPanel>
          ))}
        </TabContext>
      ) : (
        <MDTypography>You dont have any product in your inventory</MDTypography>
      )}
    </MDBox>
  );
}
