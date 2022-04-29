/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCategories, getSubCategories } from "../../lib/helper";
import { categories } from "../../redux/slices/inventory";
import { Validate } from "../../lib/Validations";

export default function SelectCategory(props) {
  const { activeTab } = props;
  const requiredFields = ["Category", "ProductCategory"];
  let validationResponse = {};

  const [openError, setOpenError] = useState({ error: false, message: "" });
  const [open, setOpen] = React.useState(props.open);
  const dispatch = useDispatch();
  let productState = useSelector(
    (state) => state.inventory.categories,
    shallowEqual
  );
  productState = productState || {};
  //   productState.ProductId = productState.ProductId || productId;
  const [product, setProduct] = useState(productState);
  const [productCategories, setProductCategory] = useState([]);
  const handleClose = () => {
    debugger;
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };

  const handleDialogClose = (e) => {
    validationResponse = Validate(requiredFields, product);
    if (!validationResponse.isValid) {
      debugger;
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    setOpen(false);
    activeTab(e, "1");
    dispatch(categories(product));
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (name === "Category") {
      const subcategory = getSubCategories(value);
      setProductCategory(subcategory);
    }
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (!value) return null;
    if (name === "Category") {
      const subcategory = getSubCategories(value);
      setProductCategory(subcategory);
    }
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
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
      height="100vh"
    >
      {open ? (
        <></>
      ) : (
        <Grid container xs={12} justifyContent="center">
          <Grid item>
            <Button
              color="primary"
              onClick={() => {
                setOpen(!open);
              }}
              variant="text"
            >
              Select your category
            </Button>
          </Grid>
        </Grid>
      )}
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Select Your primary category</DialogTitle>
        <DialogContent>
          <MDBox mb={2}>
            <Autocomplete
              disablePortal
              required
              placeholder="Category"
              id="combo-category"
              name="Category"
              value={product.Category}
              options={getCategories()}
              onSelect={handleSelect}
              sx={{
                "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root":
                  {
                    padding: 5,
                  },
              }}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Category"
                  required
                  name="Category"
                  value={product.Category}
                  onChange={handleChange}
                />
              )}
            />
          </MDBox>
          <MDBox>
            <Autocomplete
              disablePortal
              required
              placeholder="Product Category"
              id="combo-product-category"
              name="ProductCategory"
              value={product.ProductCategory}
              options={productCategories}
              onSelect={handleSelect}
              sx={{
                "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root":
                  {
                    padding: 5,
                  },
              }}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  required
                  label="Product Category"
                  name="ProductCategory"
                  onChange={handleChange}
                  value={product.ProductCategory}
                />
              )}
            />
          </MDBox>
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
          {/* </MDBox> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleDialogClose}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
