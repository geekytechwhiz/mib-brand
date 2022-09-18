/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
import { Grid } from '@mui/material';

import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { getCurrentDateTime } from 'lib/helper';
import _ from 'lodash';
import React from 'react';

const Invoice = React.forwardRef((props, ref) => {
  console.log(props);

  const { orders, brandInfo, billingDetails } = props;

  const getTotalQuantity = () => {
    const quantity = _.sumBy(orders, (x) => x.Quantity);
    return quantity;
  };
  const getTotalUnitPrice = () => {
    const unitPrice = _.sumBy(orders, (x) => x.MRP);
    return `${unitPrice}.00`;
  };
  const getTotalAmount = () => {
    const totalAmount = _.sumBy(orders, (x) => x.TotalAmount);
    return `${totalAmount}.00`;
  };

  const getTotalNetAmount = () => {
    const totalValue = _.sumBy(orders, (x) => x.TotalValue);
    return `${totalValue}.00`;
  };
  const getTotalGST = () => {
    const gstAmount = _.sumBy(orders, (x) => x.GstAmount);
    return `${gstAmount}.00`;
  };
  const getTotalSgst = () => {
    const sgstAmount = _.sumBy(orders, (x) => x.SgstAmount);
    return `${sgstAmount}.00`;
  };
  const getTotalIGST = () => {
    const igstAmount = _.sumBy(orders, (x) => x.IgstAmount);
    return `${igstAmount}.00`;
  };
  const getTotalCess = () => {
    const cess = _.sumBy(orders, (x) => x.Cess);
    return `${cess}.00`;
  };

  const getTotalTaxAmount = () => {
    const totalTaxAmount = _.sumBy(orders, (x) => x.TotalTaxAmount);
    return `${totalTaxAmount}.00`;
  };
  const getTotalDiscount = () => {
    const totalDiscount = _.sumBy(orders, (x) => x.Discount);
    return `${totalDiscount}.00`;
  };
  return (
    <>
      {orders && orders[0] ? (
        <MDBox
          ref={ref}
          py={1}
          mb={1}
          mx={2}
          sx={{ borderWidth: 1, borderStyle: 'solid' }}
        >
          <MDBox
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={1}
            px={2}
          >
            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium' gutterBottom>
                {brandInfo.BusinessDetails.BusinessName}
              </MDTypography>
              <MDTypography
                style={{ wordWrap: 'break-word' }}
                sx={{
                  display: 'box',
                  lineClamp: 0.5,
                  boxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant='caption'
                color='text'
                fontWeight='regular'
              >
                {brandInfo.Address?.Street},
              </MDTypography>
              <MDTypography
                style={{ wordWrap: 'break-word' }}
                sx={{
                  display: 'box',
                  lineClamp: 0.5,
                  boxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant='caption'
                color='text'
                fontWeight='regular'
              >
                {brandInfo.Address?.City}, {brandInfo.Address?.State},
              </MDTypography>
            </MDBox>

            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium'>
                Customer Support: {brandInfo.ContactDetails.Mobile}
              </MDTypography>
              <MDTypography variant='button' fontWeight='medium'>
                Email: {brandInfo.ContactDetails.EmailId}
              </MDTypography>
            </MDBox>
          </MDBox>
          <hr />
          <MDBox
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            py={1}
            px={2}
          >
            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium' gutterBottom>
                Tax Invoice #: {`MIB${new Date().getTime().toString()}`}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium'>
                Dated: {getCurrentDateTime()}
              </MDTypography>
            </MDBox>
          </MDBox>
          <hr /> <hr />
          <MDBox
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={1}
            px={2}
          >
            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium' gutterBottom>
                Recipient Address: {orders && orders[0]?.DeliveryDetails.Name}
              </MDTypography>
              <MDTypography
                style={{ wordWrap: 'break-word' }}
                sx={{
                  display: 'box',
                  lineClamp: 0.5,
                  boxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant='caption'
                color='text'
                fontWeight='regular'
              >
                {orders && orders[0]?.DeliveryDetails.HouseName}
              </MDTypography>
              <MDTypography
                style={{ wordWrap: 'break-word' }}
                sx={{
                  display: 'box',
                  lineClamp: 0.5,
                  boxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant='caption'
                color='text'
                fontWeight='regular'
              >
                {orders && orders[0]?.DeliveryDetails.Street}{' '}
                {orders && orders[0]?.DeliveryDetails.District}
              </MDTypography>
              <MDTypography
                style={{ wordWrap: 'break-word' }}
                sx={{
                  display: 'box',
                  lineClamp: 0.5,
                  boxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant='caption'
                color='text'
                fontWeight='regular'
              >
                {orders && orders[0]?.DeliveryDetails.State}{' '}
                {orders && orders[0]?.DeliveryDetails.PinCode}
              </MDTypography>
            </MDBox>
            <MDBox display='flex' flexDirection='column'>
              <MDTypography variant='button' fontWeight='medium'>
                Mobile No. : {orders && orders[0]?.CustomerDetails.Mobile}
              </MDTypography>
              <MDTypography variant='button' fontWeight='medium'>
                State Code : {orders && orders[0]?.DeliveryDetails.PinCode}
              </MDTypography>
              <MDTypography variant='button' fontWeight='medium'>
                GSTIN: {orders && orders[0]?.DeliveryDetails.GSTN} ||
                UNREGISTERED
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox sx={{ borderWidth: 1, borderStyle: 'solid' }}>
            <Grid container alignItems='left' px={2} columnSpacing='2px'>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Item Details
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  HSN Code
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Item Qty
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Unit Price
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                >
                  Discount
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word' }}
                >
                  Net Price
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Tax Amount
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Total
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          {orders && orders.length > 0 ? (
            orders.map((x) => (
              <MDBox sx={{ borderWidth: 1, borderStyle: 'solid' }}>
                {' '}
                <Grid container alignItems='left' px={2} columnSpacing='2px'>
                  <Grid item xs={2}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.ProductName}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.HSNCode}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.Quantity}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.MRP}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1.5}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                      sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                    >
                      {x.Discount}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                      sx={{ wordWrap: 'break-word' }}
                    >
                      {x.TotalValue}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.TotalTaxAmount}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={1}>
                    <MDTypography
                      variant='button'
                      fontWeight='medium'
                      gutterBottom
                    >
                      {x.TotalAmount}
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            ))
          ) : (
            <></>
          )}
          <MDBox sx={{ borderWidth: 1, borderStyle: 'solid' }}>
            <Grid container alignItems='left' px={2} columnSpacing='2px'>
              <Grid item xs={3}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Total
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Item Qty
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Unit Price
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                >
                  Discount
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word' }}
                >
                  Net Price
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Tax Amount
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Total Amount
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container alignItems='left' px={2} columnSpacing='2px'>
              <Grid item xs={3} />
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  {getTotalQuantity()}
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  {getTotalUnitPrice()}
                </MDTypography>
              </Grid>
              <Grid item xs={1.5}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                >
                  {getTotalDiscount()}
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word' }}
                >
                  {getTotalNetAmount()}
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium'>
                  {getTotalTaxAmount()}
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography variant='button' fontWeight='medium'>
                  {getTotalAmount()}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Grid
              container
              alignItems='center'
              display='flex'
              justifyContent='center'
              px={2}
              columnSpacing='2px'
            >
              <Grid item>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Tax Summary
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox sx={{ borderWidth: 1, borderStyle: 'solid' }}>
            <Grid container alignItems='center' px={2} columnSpacing='2px'>
              <Grid item xs={2}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                />
              </Grid>
              <Grid item xs={2} columnSpacing={1}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  GST
                </MDTypography>
              </Grid>

              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  SGST/UTGST
                </MDTypography>
              </Grid>

              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                >
                  IGST
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word' }}
                >
                  CESS
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{
                    display: 'box',
                    lineClamp: 0.5,
                    boxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  Total Tax
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox sx={{ borderWidth: 1, borderStyle: 'solid' }}>
            <Grid container alignItems='center' px={2} columnSpacing='2px'>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  Total Tax
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  {getTotalGST()}
                </MDTypography>
              </Grid>

              <Grid item xs={2}>
                <MDTypography variant='button' fontWeight='medium' gutterBottom>
                  {getTotalSgst()}
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word', lineClamp: 0 }}
                >
                  {getTotalIGST()}
                </MDTypography>
              </Grid>
              <Grid item xs={1}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{ wordWrap: 'break-word' }}
                >
                  {getTotalCess()}
                </MDTypography>
              </Grid>
              <Grid item xs={3}>
                <MDTypography
                  variant='button'
                  fontWeight='medium'
                  gutterBottom
                  sx={{
                    display: 'box',
                    lineClamp: 0.5,
                    boxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {getTotalTaxAmount()}
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox
            px={2}
            sx={{ borderWidth: 1, borderStyle: 'solid' }}
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >
            <MDBox>
              <MDTypography variant='button' fontWeight='medium' gutterBottom>
                Carrier Name:
              </MDTypography>
              <MDTypography
                variant='button'
                mx={1}
                fontWeight='medium'
                gutterBottom
              >
                {billingDetails.Courier}
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography variant='button' fontWeight='medium' gutterBottom>
                AWB Number:
              </MDTypography>
              <MDTypography
                variant='button'
                mx={1}
                fontWeight='medium'
                gutterBottom
              >
                AB8778
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox>
            <Grid
              container
              alignItems='left'
              display='flex'
              justifyContent='flex-start'
            >
              <Grid item xs={8}>
                <MDBox
                  sx={{ height: 100, borderWidth: 1, borderStyle: 'solid' }}
                />
              </Grid>
              <Grid item xs={4}>
                <MDBox
                  px={1}
                  sx={{ height: 100, borderWidth: 1, borderStyle: 'solid' }}
                >
                  <MDTypography
                    variant='button'
                    fontWeight='medium'
                    gutterBottom
                  >
                    For Migobucks Technology
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox>
            <Grid
              container
              alignItems='left'
              display='flex'
              justifyContent='flex-start'
            >
              <Grid item xs={8}>
                <MDBox display='flex' px={2} flexDirection='column'>
                  <MDTypography
                    variant='button'
                    fontWeight='medium'
                    gutterBottom
                  >
                    Registered Office:
                  </MDTypography>
                  <MDTypography variant='button' fontWeight='medium'>
                    Migobucks Technology Private LTD
                  </MDTypography>
                  <MDTypography
                    style={{ wordWrap: 'break-word' }}
                    sx={{
                      display: 'box',
                      lineClamp: 0.5,
                      boxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                  >
                    NO.14, Evoma Business Center,
                  </MDTypography>
                  <MDTypography
                    style={{ wordWrap: 'break-word' }}
                    sx={{
                      display: 'box',
                      lineClamp: 0.5,
                      boxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                    variant='caption'
                    color='text'
                    fontWeight='regular'
                  >
                    Bhattarahalli, Krishnarajapura, Bengaluru, Karnataka 560016
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={4}>
                <MDBox px={1}>
                  <MDTypography
                    variant='button'
                    fontWeight='medium'
                    gutterBottom
                  >
                    Page 1 of 1
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      ) : (
        <></>
      )}
    </>
  );
});

export default Invoice;
