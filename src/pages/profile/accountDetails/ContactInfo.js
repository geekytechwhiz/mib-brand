/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { alert } from "redux/slices/root/rootSlice";
import { updateContactInfo } from "services/onboarding";

function ContactInfo({ data }) {
  const dispatch = useDispatch();
  const options = [
    {
      label: "English",
      value: "english",
    },
    {
      label: "Hindi",
      value: "hindi",
    },
    {
      label: "Malayalam",
      value: "malayalam",
    },
  ];
  const [disabled, setDisabled] = useState(true);
  const [contactDetails, setContactDetails] = useState(data || {});

  const languages =
    contactDetails &&
    contactDetails?.Languages?.map((x) => {
      const ele = _.find(options, (e) => {
        if (e.label === x) return e;
      });
      return ele;
    });

  const [isLoading, setIsLoading] = useState({ save: false, cancel: false });
  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setContactDetails(() => ({
      ...contactDetails,
      [name]: value,
    }));
  };
  const handleAutoCompleteChange = (event, values) => {
    setContactDetails(() => ({
      ...contactDetails,
      Languages: values,
    }));
  };
  const handleSave = async () => {
    setIsLoading({ save: true, cancel: false });

    contactDetails.BrandId = localStorage.getItem("brandId");
    const emailId = localStorage.getItem("emailId");
    const req = { ...data, ...contactDetails };
    const res = await updateContactInfo(req, emailId);
    setIsLoading({ save: false, cancel: false });
    debugger;
    if (!res) {
      const error = {
        show: true,
        tittle: "Updated Action failed",
        status: "error",
        message: "Updated Action failed!",
      };
      dispatch(alert(error));
    } else {
      const success = {
        show: true,
        tittle: "Updated Successfully",
        status: "success",
        message: "Contact information uploaded successfully!",
      };
      dispatch(alert(success));
    }
  };

  const handleCancel = async () => {
    const keys = Object.keys(contactDetails);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setContactDetails(() => ({
      ...obj,
    }));
    setIsLoading({ save: false, cancel: false });
  };
  return (
    <MDBox textAlign="center">
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
              name="Name"
              value={contactDetails.Name}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="number  "
              label="Contact Number"
              value={contactDetails.Mobile}
              name="Mobile"
              fullWidth
              onChange={handleChange}
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
              value={contactDetails.EmailId}
              name="EmailId"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <Autocomplete
              disabled={disabled}
              multiple="true"
              disablePortal
              required
              value={contactDetails?.Languages}
              onChange={handleAutoCompleteChange}
              placeholder="Preferred  Language"
              id="combo-PreferredLanguage"
              name="Languages"
              options={options}
              sx={{
                "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":
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
                  onChange={handleChange}
                  value={languages}
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
        <MDBox display="flex" flexDirection="row" justifyContent="flex-end">
          <MDBox sx={{ mx: 2 }}>
            <MDLoadingButton
              loading={isLoading.cancel}
              color="error"
              loadingPosition="start"
              startIcon={<CancelIcon />}
              variant="outlined"
              mx={2}
              onClick={handleCancel}
              size="small"
            >
              Cancel
            </MDLoadingButton>
          </MDBox>
          <MDBox sx={{ mx: 2 }}>
            <MDLoadingButton
              loading={isLoading.save}
              color="success"
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              mx={2}
              onClick={handleSave}
              size="small"
            >
              Save
            </MDLoadingButton>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}

export default ContactInfo;
