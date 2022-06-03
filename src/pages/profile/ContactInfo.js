/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { updateContactInfo } from "../../services/onboarding/index";

function ContactInfo({ data }) {
  const { BrandId } = useSelector((state) => state.accountInfo) || "";
  const { EmailId } = useSelector((state) => state.accountInfo) || "";
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [contactDetails, setContactDetails] = useState(data || {});
  const [showProgress, setShowProgress] = useState(false);
  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };
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
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setContactDetails(() => ({
      ...contactDetails,
      [name]: value,
    }));
  };
  const handleAutoCompleteChange = (event, values) => {
    const languages = values.map((x) => x.value);
    setContactDetails(() => ({
      ...contactDetails,
      Languages: languages,
    }));
  };
  const handleSave = async () => {
    setShowProgress(true);
    console.log("BrandId:", BrandId);
    contactDetails.BrandId = BrandId;
    const req = { ...data, ...contactDetails };
    const res = await updateContactInfo(req, EmailId);
    if (res) {
      setShowProgress(false);
      setIsSaved(true);
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
    setShowProgress(false);
  };
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

  const getPreferredLanguage = (details) => {
    const languages = details.Languages;

    if (!languages || languages.length === 0) return "";
    const language = languages[0];
    return language;
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
      textAlign="center"
    >
      <MDModal open={showProgress} />
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent("Contact information")}
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
                  value={getPreferredLanguage(contactDetails)}
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <MDButton
              color="#007EFF"
              variant="gradient"
              mx={2}
              style={{
                color: "#007EFF",
                borderColor: "#007EFF",
                borderWidth: 1,
                borderStyle: "solid",
                marginRight: 20,
              }}
              onClick={handleCancel}
              size="small"
            >
              Cancel
            </MDButton>
          </div>
          <div>
            <MDButton
              color="#007EFF"
              variant="gradient"
              loading={showProgress}
              mx={2}
              style={{
                color: "#007EFF",
                borderColor: "#007EFF",
                borderWidth: 1,
                borderStyle: "solid",
                marginRight: 20,
              }}
              onClick={handleSave}
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
