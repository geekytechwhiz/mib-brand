/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { description } from "../../redux/slices/inventory";

function Description(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const productState =
    useSelector((state) => state.inventory.description, shallowEqual) || {};
  const [keyPoints, setKeyPoints] = useState([]);

  const [product, setProduct] = useState(productState);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct((p) => ({
      ...product,
      [name]: value,
    }));
  };
  const handleOnKeyPress = (event) => {
    debugger;
    const { value } = event.target;
    setKeyPoints((p) => ({
      ...keyPoints,
      ...value,
    }));
  };
  const handleNext = (e) => {
    dispatch(description(product));
    activeTab(e, "6");
  };
  const handleBack = (e) => {
    activeTab(e, "2");
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={-3}
      mt={-2}
      p={2}
      mb={1}
      textAlign="center"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDBox
            variant="gradient"
            bgColor="transparent"
            borderRadius="lg"
            coloredShadow="info"
            mx={0.5}
            mt={2}
            p={2}
            mb={1}
          >
            <Box mb={2}>
              <MDTypography
                variant="h5"
                textAlign="start"
                fontWeight="medium"
                color="gray"
                mb={2}
              >
                Product Description
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Product Description"
                  name="ProductDescription"
                  value={product.ProductDescription}
                  fullWidth
                  onChange={handleChange}
                  rows={6}
                  maxRows={8}
                  multiline
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                {/* <DynamicList keyPoints={keyPoints} /> */}

                <MDInput
                  required
                  type="text"
                  name="KeyPoints"
                  value={product.KeyPoints}
                  placeholder="Key Points"
                  label="Key Points"
                  fullWidth
                  onKeyPress={handleOnKeyPress}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container xs={12} justifyContent="space-between">
        <Grid item>
          <Button
            color="primary"
            onClick={handleBack}
            variant="text"
            endIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={handleNext}
            variant="text"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Description;
