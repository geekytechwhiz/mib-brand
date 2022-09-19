/* eslint-disable consistent-return */
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
// import MDDataGrid from "components/MDDataGrid";
// import EditableTable from "components/MDDataGrid/customGrid";
import MDInput from "components/MDInput";
import MDPanel from "components/MDPanel";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import _ from "lodash";
// import MUIDataGrid from "components/MDDataGrid/editableDataTable";
// import DataTable from "components/RTable";
import React, { useCallback, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { REQUIRED_FIELDS_DESCRIPTION } from "../../constants";
import { Validate } from "../../lib/validations";
import { description } from "../../redux/slices/inventory";

function Description(props) {
  const { activeTab, data } = props;
  let validationResponse = {};
  let productState = {};
  const dispatch = useDispatch();
  const [openError, setOpenError] = useState({ error: false, message: "" });

  const keys = Object.keys(data);
  if (keys.length === 0) {
    productState = useSelector(
      (state) => state.inventory.description,
      shallowEqual
    );
    productState = productState || {};
  } else {
    productState = data;
  }

  const [product, setProduct] = useState(productState);
  const initialPoints = product.keyPoints || [];
  const [keyPoints, setKeyPoints] = useState(initialPoints);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct((p) => ({
      ...product,
      [name]: value,
    }));
  };

  const handleOnKeyPress = useCallback((event) => {
    const { value } = event.target;

    if (event.key === "Enter") {
      const values = _.cloneDeep(keyPoints);

      const obj = { id: values.length + 1, point: value };
      values.push(obj);
      setKeyPoints(values);

    }
  });

  const handleClose = () => {
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };

  const handleNext = (e) => {
    validationResponse = Validate(REQUIRED_FIELDS_DESCRIPTION, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    product.keyPoints = keyPoints;
    dispatch(description(product));
    activeTab(e, "6");
  };

  const handleBack = (e) => {
    activeTab(e, "4");
  };

  const handleDeleteKeyPoints = (e, item) => {
    const filteredData = _.filter(keyPoints, (x) => x.id !== item.id);
    setKeyPoints(filteredData);
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
          <MDBox mx={0.5} mt={2} p={2} mb={1}>
            <Box mb={2}>
              <MDTypography
                variant="h6"
                textAlign="start"
                fontWeight="medium"
                mb={2}
              >
                Product Description
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  error={!product.ProductDescription}
                  type="text"
                  label="Product Description"
                  name="ProductDescription"
                  value={product.ProductDescription}
                  fullWidth
                  onChange={handleChange}
                  rows={6}
                  maxRows={8}
                  helperText="Required field"
                  multiline
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  error={!product.Stock}
                  type="number"
                  label="Stock"
                  name="Stock"
                  value={product.Stock}
                  fullWidth
                  onChange={handleChange}
                  helperText="Required field"
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type="text"
                  name="KeyPoints"
                  placeholder="Key Points" 
                  label="Key Points"
                  fullWidth
                  onKeyPress={handleOnKeyPress}
                />
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <MDBox pt={1} px={2}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Key Points
                    </MDTypography>
                  </MDBox>
                </Grid>
                {keyPoints.map((x) => (
                  <Grid item xs={12} ml={2} mb={0.5}>
                    <MDBox>
                      <MDPanel
                        fullWidth
                        item={x}
                        handleDelete={handleDeleteKeyPoints}
                      />
                    </MDBox>
                  </Grid>
                ))}
                <Grid>
                  <Grid />
                </Grid>
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
      <Grid>
        <MDSnackbar
          color="error"
          icon="warning"
          title="Missing required fields"
          content={`${openError.message}`}
          open={openError.error}
          onClose={handleClose}
          close={handleClose}
          bgWhite
        />
      </Grid>
    </MDBox>
  );
}

export default Description;
