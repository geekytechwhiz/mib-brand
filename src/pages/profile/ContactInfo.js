/* eslint-disable react/jsx-no-useless-fragment */
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import MDAlert from 'components/MDAlert';
import MDButton from 'components/MDButton';
import React, { useState } from 'react';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

function ContactInfo() {
  const [hasSaved, sethasSaved] = React.useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const onHandleEdit = () => {
    setDisabled(false);
  };
  const options = [
    {
      label: 'pvt.Ltd',
      value: 'English',
    },
    {
      label: 'pub.Ltd',
      value: 'Hindi',
    },
    {
      label: 'Malayalam',
      value: 'llp',
    },
  ];
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        {name} Saved successfully!
      </MDTypography>
    </MDTypography>
  );
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={3}
      p={1}
      mb={4}
      textAlign="center"
    >
      <Fade
        in={hasSaved}
        style={{
          transitionDelay: hasSaved ? '800ms' : '0ms',
        }}
        unmountOnExit
      >
        <CircularProgress />
      </Fade>
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent('Contact information')}
        </MDAlert>
      ) : (
        <></>
      )}

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
            Contact Info
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
              label="Contact Name"
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
              label="Contact Number"
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
              label="Email Address"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <Autocomplete
              disabled={disabled}
              disablePortal
              required
              placeholder="Preferred  Language"
              id="combo-PreferredLanguage"
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
                  label="Preferred  Language"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      {disabled ? (
        <></>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <div>
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
                setIsSaved(true);
                sethasSaved(true);
              }}
              size="small"
            >
              Save
            </MDButton>
          </div>
        </div>
      )}
    </MDBox>
  );
}

export default ContactInfo;
