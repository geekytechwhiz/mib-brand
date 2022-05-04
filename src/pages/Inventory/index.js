/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import borders from 'assets/theme/base/borders';
import boxShadows from 'assets/theme/base/boxShadows';
import colors from 'assets/theme/base/colors';
import typography from 'assets/theme/base/typography';
import MDBackdrop from 'components/MDBackDrop';
import MDBox from 'components/MDBox';
import MDButton from "components/MDButton";
import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ExclusiveTab from './ExclusiveTab';
const { grey, white } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;
const { size, fontWeightRegular } = typography;
const { dark } = colors;
const CustomTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingTop: 0,
});

export default function Products() {
  const [value, setValue] = React.useState('1');
  const [hasShow, setHasShow] = React.useState(true);
  let exTabs = [{ label: ' ', id: '' }];
  let exData = [];
  let comboTabs = [{ label: ' ', id: '' }];
  const inventoryData =
    useSelector((state) => state.inventory?.products, shallowEqual) || [];
  if (!inventoryData) return false;
  if (inventoryData.length != 0) {
    // setHasShow(false)
    exData = inventoryData['Exclusive'];
    const exKeys = Object.keys(inventoryData['Exclusive'] || {}) || [];
    const comboKeys = Object.keys(inventoryData['Combo'] || {}) || [];
    exTabs = _.map(exKeys, (val, key) => ({
      id: `${key + 1}`,
      label: `${val}`,
    }));
    comboTabs = _.map(comboKeys, (val, key) => ({
      id: `${key + 1}`,
      label: `${val}`,
    }));
    // setData(data);
    // setTabs(tabs);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MDBox
      variant='gradient'
      bgColor='transparent'
      borderRadius='lg'
      coloredShadow='info' 
      mt={2}
      p={2}
      mb={1}
      textAlign='center'
      height='100vh'
      sx={{ width: '100%', typography: 'body1' }}
    >
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <MDButton
            // onClick={handleAddProduct}
            color="#007EFF"
            variant="gradient"
            mx={2}
            style={{
              color: "#007EFF",
              borderColor: "#007EFF",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Add New
          </MDButton>
        </div>
      </div>
      {!inventoryData || inventoryData.length == 0 ? (
        <MDBackdrop show={hasShow}></MDBackdrop>
      ) : (
        <ExclusiveTab value='1' data={exData} tabs={exTabs}></ExclusiveTab>
      )}
    </MDBox>
  );
}
