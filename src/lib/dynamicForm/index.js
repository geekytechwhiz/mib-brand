/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import _ from 'lodash';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { variant } from '../../redux/slices/inventory';

export default function DynamicForm(props) {
  const { fields, activeTab } = props;
  const dispatch = useDispatch();
  const initialVariants = [];
  // const [variants, setVariants] = useState({ primary: '', secondary: '' });
  const [primary, setPrimary] = useState({});
  const [secondary, setSecondary] = useState({});

  const [variants, setVariants] = useState(initialVariants);
  const validationResponse = {};
  const productState = {};
  const [openError, setOpenError] = useState({ error: false, message: '' });
  // const fields = _.map(data, (x) => x.name);
  // const variantState = _.map(data, (x) => {
  //   const obj = {};
  //   obj[x.name] = "";
  //   return obj;
  // });
  const [values, setValues] = useState(fields);

  // useEffect(() => {
  // const fileList = _.cloneDeep(fields);
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
  // }, [fields]);

  const fieldChanged = (event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    if (!value) return null;
    const temp = values.map((ele) => {
      let obj = ele;
      if (ele.name === name) {
        obj = { ...obj, value };
      }
      return obj;
    });
    setValues(temp);
  };

  const makeRequest = () => {
    const request = {};
    values.forEach((element) => {
      const { name, value } = element;
      request[name] = value;
    });
    return request;
  };
  const handleNext = (e) => {
    debugger;
    activeTab(e, '3');
    const request = makeRequest();
    dispatch(variant(request));
  };
  const handleBack = (e) => {
    activeTab(e, '1');
    dispatch(variant(values));
  };
  const handleOnChange = useCallback((event) => {
    debugger;
    const { value, placeholder, name } = event.target;
    if (value && placeholder && name) {
      const obj = {};
      obj[name] = value;

      setVariants(() => ({
        variants,
        [placeholder]: obj,
      }));
    }
  });

  const handleAdd = (e) => {
    debugger;
    if (!primary) {
      console.log('Error ');
    } else if (!secondary) {
      console.log('Error ');
    } else {
      const variant= {...primary, ...secondary}
      setVariants(variant);
    }
  };
  return (
    <>
      <Grid
        container
        display='flex'
        spacing={1}
        justifyContent='flex-start'
        flexDirection='row'
        flexGrow={1}
      >
        {values?.length > 0 &&
          values?.map((field, index) => {
            switch (field.component) {
              case 'field_group':
                return (
                  <Grid item xs={field.size || 4} mb={2}>
                    <RadioGroup
                      key={field._uid}
                      field={field}
                      fieldChanged={fieldChanged}
                      name={field.name}
                      value={field.value || ''}
                    >
                      <FormControlLabel
                        value='exclusive'
                        control={<Radio />}
                        label='Exclusive'
                      />
                    </RadioGroup>
                  </Grid>
                );
              case 'text':
                return (
                  <Grid item xs={field.size || 4} mb={2}>
                    <MDInput
                      required={field.validation?.required}
                      type='text'
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ''}
                    />
                  </Grid>
                );
              case 'number':
                return (
                  <Grid item xs={field.size || 4} mb={2}>
                    <MDInput
                      required={field.validation?.required}
                      type='number'
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ''}
                    />
                  </Grid>
                );
              case 'options':
                return (
                  <Grid item xs={field.size || 4} mb={2}>
                    <Autocomplete
                      disablePortal
                      required={field.validation?.required}
                      label={field.label}
                      options={field.options}
                      fieldChanged={fieldChanged}
                      name={field.name}
                      value={field.value || ''}
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
                          {...params}
                          label={field.label}
                          name={field.name}
                          key={field.name}
                          value={field.value || ''}
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
                      type='text'
                      label={field.label}
                      fullWidth
                      onChange={fieldChanged}
                      name={field.name}
                      value={field.value || ''}
                    />
                  </Grid>
                );
            }
          })}
      </Grid>
      <MDBox
        variant='gradient'
        bgColor='transparent'
        borderRadius='lg'
        coloredShadow='info'
        p={2}
        mb={1}
        textAlign='center'
      >
        <Grid
          container
          display='flex'
          spacing={1}
          justifyContent='flex-start'
          flexDirection='row'
          xs={12}
        >
          <Grid item xs={3} mb={2}>
            <Autocomplete
              disablePortal
              required
              onSelect={(e) => {
                const { value, placeholder } = e.target;
                const obj={}
                obj[placeholder]=value
                setPrimary(obj);
              }}
              value={primary?.Color || ''}
              placeholder='Color'
              id='combo-Color'
              options={[
                { label: 'Red', value: 'Red' },
                { label: 'Green', value: 'Green' },
              ]}
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
                  onChange={(e) => {
                    const { value, placeholder } = e.target;
                    const obj={}
                    obj[placeholder]=value
                    setPrimary(obj);
                  }}
                  value={primary?.Color || ''}
                  {...params}
                  placeholder='Color'
                  key='primary'
                  name='Color'
                  label='Color'
                />
              )}
            />
          </Grid>

          <Grid item xs={3} mb={2}>
            <Autocomplete
              disablePortal
              value={secondary?.Size || ''}
              required
              onSelect={(e) => {
                const { value, placeholder } = e.target;
                const obj={}
                obj[placeholder]=value
                setSecondary(obj);
              }}
              placeholder='Size'
              id='combo-Color'
              options={[
                { label: 'XL', value: 'XL' },
                { label: 'M', value: 'M' },
                { label: 'L', value: 'L' },
                { label: 'S', value: 'S' },
              ]}
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
                  onChange={(e) => {
                    const { value, placeholder } = e.target;
                    const obj={}
                    obj[placeholder]=value
                    setSecondary(obj);
                  }}
                  value={secondary?.Size || ''}
                  placeholder='Size'
                  {...params}
                  name='Size'
                  label='Size'
                />
              )}
            />
          </Grid>
          <Grid item xs={3} mb={2}>
            <Button color='primary' onClick={handleAdd} variant='text'>
              Add
            </Button>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Grid container xs={12} justifyContent='space-between'>
          <Grid item>
            <Button
              color='primary'
              onClick={handleBack}
              variant='text'
              endIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>
          </Grid>
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
      </MDBox>
    </>
  );
}
