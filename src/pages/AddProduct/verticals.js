/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import { ExpandMoreOutlined, Search } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { REQUIRED_FIELDS_CATEGORY } from "../../lib/constants";
import { BUSINESS_CATEGORY } from "../../lib/data";
import { getSubCategories } from "../../lib/helper";
import { Validate } from "../../lib/validations";
import { categories } from "../../redux/slices/inventory";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreOutlined sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: "lg",
  flexDirection: "flex-start",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CategoryAccordion(props) {
  const [expanded, setExpanded] = React.useState(BUSINESS_CATEGORY[0].category);
  const [verticals, setVerticals] = useState(BUSINESS_CATEGORY);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  let productState = {};
  const { activeTab, data } = props;
  let validationResponse = {};
  const [openError, setOpenError] = useState({ error: false, message: "" });
  const [productCategory, setProductCategory] = useState("");
  const keys = Object.keys(data);
  if (keys.length === 0) {
    productState = useSelector(
      (state) => state.inventory.categories,
      shallowEqual
    );
    productState = productState || {};
  } else {
    productState = data;
  }

  useEffect(() => {
    debugger;
    setProductCategory(productState.ProductCategory);
  }, [productCategory]);

  const [product, setProduct] = useState(productState);

  const handleSelect = (event, item) => {
    const { value } = event.target;
    if (!value || !item) return null;

    setProduct(() => ({
      ...product,
      Category: item.category,
      ProductCategory: value,
    }));
  };

  const handleBack = (e) => {
    activeTab(e, "4");
  };

  const handleClose = () => {
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };
  const handleKeyDown = (e) => {
    debugger;
    const { value } = e.target;
    if (!value) {
      setVerticals(BUSINESS_CATEGORY);
    } else {
      const filteredData = _.filter(BUSINESS_CATEGORY, (x) =>
        _.includes(x.category, value)
      );
      setVerticals(filteredData);
    }
  };
  const handleNext = (e) => {
    validationResponse = Validate(REQUIRED_FIELDS_CATEGORY, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    dispatch(categories(product));
    activeTab(e, "1");
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={-3}
      mt={-2}
      px={2}
      py={3}
      mb={5}
      textAlign="center"
    >
      <MDBox sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <InputBase
          fullWidth
          sx={{ ml: 1, flex: 1, borderRadius: "lg" }}
          placeholder="Search for your vertical"
          // onKeyDown={handleKeyDown}
          onKeyUp={handleKeyDown}
          inputProps={{ "aria-label": "search for your vertical" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </MDBox>
      {verticals &&
        verticals.map((x) => (
          <Accordion
            expanded={expanded === x.category}
            onChange={handleChange(x.category)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id={`${x.category}`}
            >
              <MDTypography variant="caption" fontWeight="medium" gutterBottom>
                {x.category}
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <MDBox mb={2}>
                    <Autocomplete
                      disablePortal
                      required
                      placeholder="ProductCategory"
                      id=" ProductCategory"
                      name="ProductCategory"
                      value={productCategory}
                      options={getSubCategories(x.category)}
                      onSelect={(e) => {
                        handleSelect(e, x);
                      }}
                      sx={{
                        "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root":
                          {
                            padding: 5,
                          },
                      }}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          label="ProductCategory"
                          required
                          name="ProductCategory"
                          value={productCategory}
                          onChange={handleChange}
                        />
                      )}
                    />
                  </MDBox>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      <Grid mt={5} container xs={12} justifyContent="space-between">
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
