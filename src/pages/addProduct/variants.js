/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable array-callback-return */
/* eslint-disable no-debugger */
import { Autocomplete, Button, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import React, { useState } from "react";

function Variants() {
  const [primary, setPrimary] = useState({});
  const [secondary, setSecondary] = useState({});

  const [variants, setVariants] = useState([]);
  const keys = Object.keys(variants[0] || {});
  const handleAdd = () => {
    debugger;
    if (!primary) {
      console.log("Error ");
    } else if (!secondary) {
      console.log("Error ");
    } else {
      const variant = { ...primary, ...secondary };
      setVariants({ variant });
    }
  };
  function RenderVariants() {
    return (
      <>
        <Grid container xs={10}>
          {keys?.length > 0 ? (
            keys.map((x) => {
              <Grid item>{x}</Grid>;
            })
          ) : (
            <></>
          )}
        </Grid>
        <Grid container xs={10}>
          {keys?.length > 0 && variants?.length > 0 ? (
            variants.map((item) => {
              keys.map((x) => {
                <Grid item>{item[x]}</Grid>;
              });
            })
          ) : (
            <></>
          )}
        </Grid>
      </>
    );
  }
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      p={2}
      mb={1}
      textAlign="center"
    >
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="flex-start"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={3} mb={2}>
          <Autocomplete
            disablePortal
            required
            onSelect={(e) => {
              const { value, placeholder } = e.target;
              const obj = {};
              obj[placeholder] = value;
              setPrimary(obj);
            }}
            value={primary?.Color || ""}
            placeholder="Color"
            id="combo-Color"
            options={[
              { label: "Red", value: "Red" },
              { label: "Green", value: "Green" },
            ]}
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
                onChange={(e) => {
                  const { value, placeholder } = e.target;
                  const obj = {};
                  obj[placeholder] = value;
                  setPrimary(obj);
                }}
                value={primary?.Color || ""}
                {...params}
                placeholder="Color"
                key="primary"
                name="Color"
                label="Color"
              />
            )}
          />
        </Grid>

        <Grid item xs={3} mb={2}>
          <Autocomplete
            disablePortal
            value={secondary?.Size || ""}
            required
            onSelect={(e) => {
              const { value, placeholder } = e.target;
              const obj = {};
              obj[placeholder] = value;
              setSecondary(obj);
            }}
            placeholder="Size"
            id="combo-Color"
            options={[
              { label: "XL", value: "XL" },
              { label: "M", value: "M" },
              { label: "L", value: "L" },
              { label: "S", value: "S" },
            ]}
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
                onChange={(e) => {
                  const { value, placeholder } = e.target;
                  const obj = {};
                  obj[placeholder] = value;
                  setSecondary(obj);
                }}
                value={secondary?.Size || ""}
                placeholder="Size"
                {...params}
                name="Size"
                label="Size"
              />
            )}
          />
        </Grid>
        <Grid item xs={3} mb={2}>
          <Button color="primary" onClick={handleAdd} variant="text">
            Add
          </Button>
        </Grid>
        {keys?.length > 0 ? <RenderVariants /> : <></>}
      </Grid>
    </MDBox>
  );
}

export default Variants;
