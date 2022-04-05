/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import FormControlLabel from '@mui/material/FormControlLabel';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';

export default function BusinessDetails() {
  const [disabled, setDisabled] = useState(true);
  const options = [
    {
      label: 'Private Limited',
      value: 'pvt.Ltd',
    },
    {
      label: 'Public Limited',
      value: 'pub.Ltd',
    },
    {
      label: 'Limited Liability Partnership',
      value: 'llp',
    },
  ];
  const onHandleEdit = () => {
    setDisabled(false);
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={3}
      p={1}
      pb={5}
      mb={4}
      textAlign="flex-start"
    >
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="space-around"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={11}>
          <MDTypography
            variant="h5"
            textAlign="start"
            fontWeight="medium"
            color="gray"
            p={1}
            mb={2}
          >
            Business Details
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            onClick={onHandleEdit}
          >
            <ModeEditOutlinedIcon fontSize="small">Edit</ModeEditOutlinedIcon>
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="space-around"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Business Name"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            placeholder="Business Type"
            id="combo-BusinessType"
            options={options}
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
              <MDInput disabled={disabled} {...params} label="Business Type" />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            placeholder="Business Category"
            id="combo-BusinessCategory"
            options={options}
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
              <MDInput
                disabled={disabled}
                {...params}
                label="Business Category"
              />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            placeholder="Sub Category"
            id="combo-SubCategory"
            options={options}
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
              <MDInput disabled={disabled} {...params} label="Sub Category" />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Grid item xs={12} mb={2}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="gstin"
                disabled={disabled}
                control={<Radio />}
                label="We have GSTIN"
              />
              <FormControlLabel
                disabled={disabled}
                value="nogstin"
                control={<Radio />}
                label="We dont have have GSTIN"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="GSTIN"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Business PAN"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="PAN Owner Name"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Billing Label"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Pin Code"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MDInput
            disabled={disabled}
            type="text"
            label="Website link"
            fullWidth
          />
        </Grid>{' '}
        <Grid item xs={5} />
      </Grid>
    </MDBox>
  );
}
