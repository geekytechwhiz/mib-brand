/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { PhotoCamera } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, LinearProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDSelect from 'components/MDSelect';
import MDTypography from 'components/MDTypography';
import TagsInput from 'components/MDTagInput';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const S3_BUCKET = 'mib-brand-inbound';
const REGION = 'ap-south-1';

function ProductDetailsPanel(props) {
  const { activeTab } = props;

  const productId = `P${new Date().getTime().toString()}`;
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
  const [imageList, setImageList] = useState([image]);
  const [files, setfiles] = useState(fileList);

  const handleCreateSession = async () => {
    // const productInfo = await dispatch(ProductDetails(productDetails));
    // if (productInfo.payload) {
    //   console.log("brandinfo", productInfo.payload);
    // }
  };

  const handleSelecetedTags = (items) => {
    console.log(items);
  };
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

  const uploadFile = (file) => {
    // const BrandId = localStorage.getItem("BrandId");
    // fileList.forEach((element) => {
    //   const params = {
    //     Body: file,
    //     Bucket: `${S3_BUCKET}/${BrandId}/${productId}`,
    //     Key: file.name,
    //   };
    //   myBucket
    //     .putObject(params)
    //     .on("httpUploadProgress", (evt) => {
    //       console.log(params.Key, "Upload sucessfull");
    //       setProgress(Math.round((evt.loaded / evt.total) * 100));
    //     })
    //     .send((err) => {
    //       if (err) console.log(err);
    //     });
    // });
  };

  const handleFileInput = (e) => {
    // const file = e.target.files[0];
    // // const selectedFiles = [...files, file];
    // // setfiles(selectedFiles);
    // const BrandId = localStorage.getItem("BrandId");
    // const params = {
    //   Body: file,
    //   Bucket: `${S3_BUCKET}/${BrandId}/${productId}`,
    //   Key: file.name,
    // };
    // const img = { Name: file.name, Tittle: file.type };
    // myBucket
    //   .putObject(params)
    //   .on("httpUploadProgress", (evt) => {
    //     console.log(params.Key, "Upload sucessfull");
    //   })
    //   .send((err) => {
    //     if (err) console.log(err);
    //   });
    // const updatedCarsArray = [...imageList, img];
    // setImageList(updatedCarsArray);
  };

  const handleSubmit = () => {
    // UploadFile(images[0]["path"]);
  };

  const [rememberMe, setRememberMe] = useState(false);
  const options = [
    {
      label: 'Red',
      value: '#D32F2F',
    },
    {
      label: 'Green',
      value: '#4CAF50',
    },
    {
      label: 'Blue',
      value: '#ffffff',
    },
  ];
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate('/add-product');
  };
  const handleNext = (e) => {
    activeTab(e, '2');
  };
  const category = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
  ];
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
      <Grid item xs={12}>
        <MDBox
          pt={4}
          pb={3}
          px={3}
          variant="gradient"
          bgColor="transparent"
          borderRadius="lg"
          coloredShadow="info"
          mx={0.5}
          mt={2}
          p={2}
          mb={1}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="exclusive"
                  control={<Radio />}
                  label="Exclusive"
                />
                <FormControlLabel
                  value="combo"
                  control={<Radio />}
                  label="Combo"
                />
              </RadioGroup>
            </Grid>{' '}
            <Grid item xs={4} mb={2}>
              <Autocomplete
                disablePortal
                required
                placeholder="Category"
                id="combo-category"
                options={category}
                sx={{
                  '& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input':
                    {
                      paddingTop: 0,
                      paddingLeft: 4,
                      paddingRight: 6,
                      paddingBottom: 0,
                    },
                }}
                renderInput={(params) => (
                  <MDInput {...params} label="Category" />
                )}
              />
            </Grid>
            <Grid item xs={4} mb={2}>
              <Autocomplete
                disablePortal
                required
                placeholder="Product Category"
                id="combo-product-category"
                options={category}
                renderInput={(params) => (
                  <MDInput {...params} label="Product Category" />
                )}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MDBox
            pt={4}
            pb={3}
            px={3}
            variant="gradient"
            bgColor="transparent"
            borderRadius="lg"
            coloredShadow="info"
            mx={0.5}
            mt={2}
            p={2}
            mb={1}
          >
            <Grid item xs={12} mb={2}>
              <MDTypography
                variant="h5"
                textAlign="start"
                fontWeight="medium"
                color="gray"
                mb={2}
              >
                Upload Product Images
              </MDTypography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Stack
                style={{ marginBottom: 20 }}
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <label htmlFor="icon-button-file">
                  <Input
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleFileInput}
                  />
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <label>
                  <LinearProgress variant="determinate" value={70} />
                </label>
              </Stack>
              <Card>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {imageList?.map((index, item) => (
                    <ListItem key={index}>
                      <ListItemAvatar
                        sx={{
                          height: 75,
                          alignItems: 'center',
                          alignContent: 'center',
                          padding: 2,
                          borderColor: 'gray',
                        }}
                      >
                        <Avatar>
                          <img
                            style={{
                              height: '25px',
                              width: '37px',
                              padding: 2,
                            }}
                            src="data:image/png;base64,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"
                            alt=""
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary="Jan 9, 2014"
                      />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={9}>
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
                Product Details
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={6} mb={2}>
                <MDInput required type="text" label="Product Name" fullWidth />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput required type="text" label="Brand Name" fullWidth />
              </Grid>
              <Grid item xs={12} mb={2}>
                <MDInput required type="text" label="Tittle" fullWidth />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="County Of Origin"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} mb={2}>
                <Grid item xs={12} mb={2}>
                  <TagsInput
                    selectedTags={handleSelecetedTags}
                    fullWidth
                    variant="outlined"
                    id="keyPoints"
                    name="Key Points"
                    placeholder="Add Key Points"
                    label="Key Points"
                    multiline
                    rows={6}
                    maxRows={8}
                  />
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <div>
          <Button
            color="primary"
            onClick={handleNext}
            variant="text"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </div>
      </div>
    </MDBox>
  );
}

export default ProductDetailsPanel;
