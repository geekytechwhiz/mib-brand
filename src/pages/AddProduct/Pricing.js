/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pricing(props) {
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
      mb={2}
      textAlign="center"
    >
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="flex-start"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={5}>
          <Box mb={2}>
            <MDTypography
              variant="h5"
              textAlign="start"
              fontWeight="medium"
              color="gray"
              p={3}
              mb={2}
            >
              Pricing
            </MDTypography>
          </Box>
          <Grid item xs={8} mb={2}>
            <MDInput required type="text" label="GST" fullWidth />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput required type="text" label="Buddy Margin" fullWidth />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput required type="text" label="Loyalty Point" fullWidth />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput required type="text" label="MRP" fullWidth />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MDTypography
            variant="h5"
            textAlign="start"
            fontWeight="medium"
            color="gray"
            p={3}
            mb={2}
          >
            Shipping
          </MDTypography>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Local Delivery Charges"
              fullWidth
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Zonal Delivery Charges "
              fullWidth
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="National Delivery Charges"
              fullWidth
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput required type="text" label="Selling Price" fullWidth />
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={12} justifyContent="space-between">
        <Grid item>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Accept terms and condition"
          />
        </Grid>
        <Grid item>
          <MDButton
            variant="gradient"
            color="#007EFF"
            onClick={() => {
              console.log('Save');
            }}
            size="small"
            style={{
              color: '#007EFF',
              marginRight: 50,
              borderColor: '#007EFF',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            mx={2}
          >
            {' '}
            Draft
          </MDButton>
          <MDButton
            color="#007EFF"
            variant="gradient"
            mx={2}
            style={{
              color: '#007EFF',
              borderColor: '#007EFF',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            onClick={() => {
              console.log('Save');
            }}
            size="small"
          >
            {' '}
            Publish
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Pricing;
