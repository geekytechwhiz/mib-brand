/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { variant } from "../../redux/slices/inventory";

export default function DynamicForm(props) {
  const { fields, activeTab } = props;
  const dispatch = useDispatch();
  const validationResponse = {};
  const productState = {};
  const [openError, setOpenError] = useState({ error: false, message: "" });
  // const fields = _.map(data, (x) => x.name);
  // const variantState = _.map(data, (x) => {
  //   const obj = {};
  //   obj[x.name] = "";
  //   return obj;
  // });
  const [values, setValues] = useState({});

  useEffect(() => {
    const fileList = _.cloneDeep(fields);
    // setValues((currentValues) => {
    //   const newValues = fileList.reduce((obj, field) => {
    //     if (field.component === "field_group") {
    //       for (const subField of field.fields) {
    //         obj[subField.name] = "";
    //       }
    //     } else {
    //       obj[field.name] = "";
    //     }

    //     return obj;
    //   }, {});

    //   return { ...newValues, ...currentValues };
    // });
  }, [fields]);

  const fieldChanged = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (!value) return null;

    setValues(() => ({
      ...values,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    activeTab(e, "3");
    dispatch(variant(values));
  };
  const handleBack = (e) => {
    activeTab(e, "1");
    dispatch(variant(values));
  };
  return (
    <>
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="flex-start"
        flexDirection="row"
        flexGrow={1}
      >
        {fields?.length > 0 &&
          fields?.map((field) => {
            switch (field.component) {
              case "field_group":
                return (
                  <Grid item xs={4} mb={2}>
                    <RadioGroup
                      key={field._uid}
                      field={field}
                      fieldChanged={fieldChanged}
                      name={field.name}
                      value={field.value || ""}
                    >
                      <FormControlLabel
                        value="exclusive"
                        control={<Radio />}
                        label="Exclusive"
                      />
                    </RadioGroup>
                  </Grid>
                );
              case "text":
                return (
                  <Grid item xs={4} mb={2}>
                    <MDInput
                      required={field.validation?.required}
                      type="text"
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ""}
                    />
                  </Grid>
                );
              case "number":
                return (
                  <Grid item xs={4} mb={2}>
                    <MDInput
                      required={field.validation?.required}
                      type="number"
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ""}
                    />
                  </Grid>
                );
              case "options":
                return (
                  <Grid item xs={4} mb={2}>
                    <Autocomplete
                      disablePortal
                      required={field.validation?.required}
                      label={field.label}
                      options={field.options}
                      fieldChanged={fieldChanged}
                      name={field.name}
                      value={field.value || ""}
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
                          {...params}
                          label={field.label}
                          name={field.name}
                          key={field.name}
                          value={field.value || ""}
                          onChange={fieldChanged}
                        />
                      )}
                    />
                  </Grid>
                );
              default:
                return (
                  <Grid item xs={4} mb={2}>
                    <MDInput
                      required={field.validation?.required}
                      type="text"
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ""}
                    />
                  </Grid>
                );
            }
          })}
      </Grid>
      <MDBox
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
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
    </>
  );
}
