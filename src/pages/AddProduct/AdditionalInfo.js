/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import TagsInput from 'components/MDTagInput';
import MDTypography from 'components/MDTypography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdditionalInfo(props) {
  const { activeTab } = props;

  const productId = `P${new Date().getTime().toString()}`;
  const [tags, setTags] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  function handleSelectedTags(items) {
    console.log(items);
  }

  const product = {
    ProductId: productId,
    BrandId: '',
    ProductName: '',
    BrandName: '',
    Category: '',
    ProductCategory: '',
    Tittle: '',
    TraceId: '',
    CountryOfOrgin: '',
    Description: '',
    KeyPoints: [],
    ImageLinks: [],
  };
  const [productDetails, setProductDetails] = useState(product);

  // const details = useAppSelector((state) => state.inventory.productDetails);
  const categoryDetails = []; // useAppSelector((state) => state.inventory.category);
  const categories = []; // useAppSelector((state) => Object.keys(state.inventory.category));
  // console.log(details);

  const validation = {
    ProductName: {
      error: false,
      message: 'Product Name is  Required',
    },
    BrandName: {
      error: false,
      message: 'Brand Name is Required',
    },
    Tittle: {
      error: false,
      message: 'Tittle is  Required',
    },
    Description: {
      error: false,
      message: 'Description is Required',
    },
    Orgin: {
      error: false,
      message: 'Country of orgin is Required',
    },
  };

  const [validationOptions, setvalidationOptions] = useState(validation);
  const [productCategories, setproductCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  // const dispatch = useAppDispatch();
  const [validate, setValidate] = useState({ helperText: '', error: false });
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const image = { Name: '', Type: '' };
  const fileList = [];

  const validateInputs = () => {
    let count = 0;
    const productDetailsObj = {
      ProductId: productId,
      ProductName: '',
      BrandName: '',
      Tittle: '',
      Description: '',
      Origin: '',
    };
    const productModelkeys = Object.keys(productDetailsObj);
    productModelkeys.forEach((x) => {
      if (productDetails && x && !productDetails[x]) {
        if (validationOptions[x]) {
          validationOptions[x].error = true;
          count += 1;
        }
      } else if (validationOptions[x]) {
        validationOptions[x].error = false;
      }
    });
    setvalidationOptions((p) => ({
      ...validationOptions,
    }));
    return count;
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (name === 'Category') {
      const selectedCategories = categoryDetails[value];
      setproductCategory(selectedCategories);
    }
    setProductDetails((p) => ({
      ...productDetails,
      [name]: value,
    }));
  };

  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate('/add-product');
  };
  const handleNext = (e) => {
    activeTab(e, '4');
  };
  const handleBack = (e) => {
    activeTab(e, '2');
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
                Additional Info
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={2} mb={2}>
                <MDInput required type="text" label="Age Group" fullWidth />
              </Grid>
              <Grid item xs={2} mb={2}>
                <MDInput required type="text" label="Warranty" fullWidth />
              </Grid>
              <Grid item xs={8} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Return and Refund details"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Package details"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Important Notes"
                  fullWidth
                  rows={6}
                  maxRows={8}
                  multiline
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <TagsInput
                  selectedTags={handleSelectedTags}
                  fullWidth
                  variant="outlined"
                  id="tags"
                  name="tags"
                  placeholder="add Tags"
                  label="tags"
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

export default AdditionalInfo;
