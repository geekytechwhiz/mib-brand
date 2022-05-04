/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDSnackbar from 'components/MDSnackbar';
import MDTypography from 'components/MDTypography';
import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Validate } from '../../lib/Validations';
import { vitalInfo } from '../../redux/slices/inventory';
import { REQUIRED_FIELDS_VITAL_INFO } from '../../lib/Constants';

function VitalInfo(props) {
  debugger;
  const { activeTab } = props;
  let validationResponse = {}; 
  const dispatch = useDispatch();
  const [openError, setOpenError] = useState({ error: false, message: '' });
  const productState = useSelector(
    (state) => state.inventory.vitalInfo,
    shallowEqual
  );

  const brandId = localStorage.getItem('brandId');
  if (!brandId) {
    setOpenError({
      error: true,
      message: 'Some technical error happened.Please login again and try',
    });
  } 
   
  const [product, setProduct] = useState(productState);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    debugger;
    validationResponse = Validate(REQUIRED_FIELDS_VITAL_INFO, product);

    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    activeTab(e, '2');
    setProduct(() => ({
      ...product,
    }));
    dispatch(vitalInfo(product));
  };
  const handleClose = () => {
    const error = {
      error: false,
      message: '',
    };
    setOpenError(error);
  };

  return (
    <MDBox
      variant='gradient'
      bgColor='transparent'
      borderRadius='lg'
      coloredShadow='info'
      mx={-3}
      mt={-2}
      p={2}
      mb={1}
      textAlign='center'
    >
      <Grid container alignItems='center' spacing={2}>
        <Grid item xs={12}>
          <MDBox
            variant='gradient'
            bgColor='transparent'
            borderRadius='lg'
            coloredShadow='info'
            mx={0.5}
            mt={2}
            p={2}
            mb={1}
          >
            <Box mb={2}>
              <MDTypography
                variant='h5'
                textAlign='start'
                fontWeight='medium'
                
                mb={2}
              >
                Product Details
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type='text'
                  label='Tittle'
                  error={!product.Title}
                  fullWidth
                  onChange={handleChange}
                  name='Tittle'
                  value={product.Title}
                  helperText='Required field'
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type='text'
                  label='Brand Name'
                  error={!product.ProductBrand}
                  fullWidth
                  onChange={handleChange}
                  name='ProductBrand'
                  value={product.ProductBrand}
                  helperText='Required field'
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type='text'
                  label='Manufacturer'
                  name='Manufacturer'
                  error={!product.ProductBrand}
                  value={product.Manufacturer}
                  fullWidth
                  onChange={handleChange}
                  helperText='Required field'
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type='number'
                  label='Number Of Items'
                  error={!product.NumberOfItems}
                  fullWidth
                  onChange={handleChange}
                  name='NumberOfItems'
                  value={product.NumberOfItems}
                  helperText='Required field'
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type='text'
                  label='Unit Count'
                  error={!product.UnitCount}
                  fullWidth
                  onChange={handleChange}
                  name='UnitCount'
                  value={product.UnitCount}
                  helperText='Required field'
                />
              </Grid>
              <Grid item xs={3} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  value={product.UnitType}
                  placeholder='Unit Type'
                  id='combo-taxCode'
                  name='UnitType'
                  options={[
                    { value: 'Count', label: 'Count' },
                    { value: 'Grams', label: 'Grams' },
                  ]}
                  onSelect={handleChange}
                  sx={{
                    '& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root':
                      {
                        padding: 5,
                      },
                  }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label='Unit Type'
                      name='UnitType'
                      onChange={handleChange}
                      value={product.TaxCode}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={9} mb={2}>
                <MDInput
                  required
                  type='text'
                  error={!product.WarrantyDescription}
                  label='Warranty Description'
                  fullWidth
                  onChange={handleChange}
                  name='WarrantyDescription'
                  value={product.WarrantyDescription}
                  helperText='Required field'
                />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container xs={12} justifyContent='space-between'>
        <Grid item />
        <Grid item>
          <Button
            color='primary'
            onClick={handleNext}
            variant='text'
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <MDSnackbar
          color='error'
          icon='warning'
          title='Missing required fields'
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

export default VitalInfo;
