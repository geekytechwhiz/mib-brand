/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
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
import { useDispatch, useSelector } from 'react-redux';
import { alert } from 'redux/slices/root/rootSlice';
import MDSnackbar from 'components/MDSnackbar';
import { postProducts } from '../../services/inventory';
import { Validate } from '../../lib/Validations';
import {
  ALL_REQUIRED_FIELDS,
  MORE_DETAILS_REQUIRED_FIELDS,
  PRODUCT_TYPES,
} from '../../lib/Constants';

function MoreDetails(props) {
  const { activeTab } = props;
  let validationResponse = {};
  const [openError, setOpenError] = useState({ error: false, message: '' });
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.pricing) || {};
  const { vitalInfo, offers, medias, description, categories, variant } =
    useSelector((state) => state.inventory);

  const [product, setProduct] = useState(productState);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const handleClose = () => {
    const error = {
      error: false,
      message: '',
    };
    setOpenError(error);
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    debugger;
    const productId = `P${new Date().getTime().toString()}`;
    const brandId = localStorage.getItem('brandId');
    
    if (!brandId) {
      setOpenError({
        error: true,
        message: 'Some technical error happened.Please login again and try',
      });
      return false;
    }
    validationResponse = Validate(MORE_DETAILS_REQUIRED_FIELDS, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    } 
    const request = {
      BrandId: brandId,
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };

    validationResponse = Validate(ALL_REQUIRED_FIELDS, request);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    } 
    request.Status = 'Published';

    const data = await postProducts(request, brandId);
    if (!data) {
      const error = {
        status: 'error',
        message:
          'Product upload failed. Please check for any error or try again',
      };
      dispatch(alert(error));
    }else{
      const success = {
        status: 'success',
        message:
          'Product has been uploaded to your inventory and will be live in few minutes',
      };
      dispatch(alert(success));
    }
  };
  const handleDraft = () => {
    const request = {
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };
    request.Status = 'Draft';
    postProducts(request, vitalInfo.BrandId);
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
      mb={2}
      textAlign='center'
    >
      <Grid
        container
        display='flex'
        spacing={1}
        justifyContent='flex-start'
        flexDirection='row' 
      >
        <Grid item xs={5}>
          <Box mb={2}>
            <MDTypography
              variant='h5'
              textAlign='start'
              fontWeight='medium'
               
              p={3}
              mb={2}
            >
              Pricing
            </MDTypography>
          </Box>

          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              label='Buddy Margin'
              name='BuddyMargin'
              value={product.BuddyMargin}
              error={!product.BuddyMargin}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              label='Loyalty Point'
              name='LoyaltyPoint'
              error={!product.LoyaltyPoint}
              value={product.LoyaltyPoint}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MDTypography
            variant='h5'
            textAlign='start'
            fontWeight='medium'
           
            p={3}
            mb={2}
          >
            Shipping
          </MDTypography>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              label='Local Delivery Charges'
              name='LocalDeliveryCharge'
              value={product.LocalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              label='Zonal Delivery Charges '
              name='ZonalDeliveryCharge'
              value={product.ZonalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              label='National Delivery Charges'
              name='NationalDeliveryCharge'
              value={product.NationalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type='text'
              name='SellingPrice'
              value={product.SellingPrice}
              label='Selling Price'
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={12} justifyContent='space-between'>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                onClick={() => {
                  const value = !acceptTerms;
                  setAcceptTerms(value);
                }}
                checked={acceptTerms}
              />
            }
            label='Accept terms and condition'
          />
        </Grid>
        <Grid item>
          <MDButton
            variant='gradient'
            color='#007EFF'
            onClick={handleDraft}
            size='small'
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
            color='#007EFF'
            variant='gradient'
            mx={2}
            disabled={!acceptTerms}
            style={{
              color: '#007EFF',
              borderColor: '#007EFF',
              borderWidth: 1,
              borderStyle: 'solid',
            }}
            onClick={handlePublish}
            size='small'
          >
            {' '}
            Publish
          </MDButton>
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
      </Grid>
    </MDBox>
  );
}

export default MoreDetails;
