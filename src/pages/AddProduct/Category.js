/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MDSnackbar from "components/MDSnackbar";
import { REQUIRED_FIELDS_CATEGORY } from "../../lib/constants";
import { getCategories, getSubCategories } from "../../lib/helper";
import { Validate } from "../../lib/validations";
import { categories } from "../../redux/slices/inventory";
import { BUSINESS_CATEGORY } from "../../lib/data";

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
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  let productState = {};
  const { activeTab, data } = props;
  let validationResponse = {};
  const [openError, setOpenError] = useState({ error: false, message: "" });

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

  useEffect(() => {}, []);
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
      p={2}
      mb={1}
      textAlign="center"
    >
      {BUSINESS_CATEGORY &&
        BUSINESS_CATEGORY.map((x) => (
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
                      value={product[x.ProductCategory]}
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
                          value={product[x.ProductCategory]}
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
