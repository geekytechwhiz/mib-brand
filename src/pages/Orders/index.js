/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { useMemo, useEffect, useState } from 'react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
// Images
import LogoAsana from 'assets/images/small-logos/logo-asana.svg';
import MDAvatar from 'components/MDAvatar';
import MDBox from 'components/MDBox';
import MDProgress from 'components/MDProgress';
import MDSelect from 'components/MDSelect';
import MDTypography from 'components/MDTypography';
import { LightTooltip } from 'components/MDTooltip';
import CustomSelect, { StyledOption } from 'components/MDDropdown/index';
// import Orders from '../../assets/mockData/data';

function index() {
  const columns = {
    orderId: '',
    productName: '',
    orderedDate: '',
    productType: ' ',
    pinCode: 0,
    status: ' ',
    progress: '',
    revenue: '',
  };
  const Orders = [
    {
      orderId: 545454,
      productName:
        'AAA BB CCCcccccccccccccccccccccccccccccccccccc ssssssssssssssssssssssss xxxxxxxxxxxx',
      orderedDate: '04/05/2022 : 10:59:45',
      productType: 'Exclusive',
      shippingAddress: 'Kakkanad, Kochi',
      pinCode: 6565664,
      status: 'Order Placed',
      invoice: '',
    },
  ];
  const [dataRows, setDataRow] = useState([columns]);
  const createColumn = (row, column) => (
    <MDTypography
      component="a"
      href="#"
      variant="button"
      color="text"
      fontWeight="medium"
    >
      {row[column]}
    </MDTypography>
  );
  function ProductName(row, column) {
    const name = row[column];
    return (
      <MDBox
        display="flex"
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '6rem' }}
        alignItems="center"
        lineHeight={1}
      >
        <MDAvatar src={LogoAsana} name={name} size="sm" variant="rounded" />
        {/* <Tooltip title={name}> */}
        <LightTooltip title={name}>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            ml={1}
            lineHeight={1}
          >
            {name}
          </MDTypography>
        </LightTooltip>
      </MDBox>
    );
  }

  function Status(ele) {
    const { value } = ele;
    const options = [
      {
        label: 'Packed',
        value: 'packed',
      },
      {
        label: 'Shipped',
        value: 'shipped',
      },
      {
        label: 'In Transits',
        value: 'inTransits',
      },
    ];
    return (
      <MDBox display="flex" alignItems="center">
        <MDBox m={1}>
          <CustomSelect
            placeholder="Category"
            defaultValue="packed"
            value={value}
            label={value}
            sx={{ width: '5rem' }}
            options={options}
          >
            {options.map((x) => (
              <StyledOption sx={{ width: '5rem' }} value={x.value}>
                {x.label}
              </StyledOption>
            ))}
          </CustomSelect>
        </MDBox>
      </MDBox>
    );
  }
  function Progress(row, column) {
    const value = 60;
    const status = row[column];
    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}%
        </MDTypography>
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color="info" value={value} />
        </MDBox>
      </MDBox>
    );
  }
  const makeRows = () => {
    const dataset = Orders;
    const rows = [];
    if (dataset && dataset.length > 0) {
      dataset.forEach((element) => {
        const keys = Object.keys(columns);
        const ele = {};
        keys.forEach((x) => {
          if (x === 'productName') {
            ele[x] = ProductName(element, x);
          } else if (x === 'status') {
            ele[x] = Status(element, x);
          } else if (x === 'progress') {
            ele[x] = Progress(element, x);
          } else {
            ele[x] = createColumn(element, x);
          }
        });
        rows.push(ele);
        console.log('Element', ele);
      });
      console.log('orders', rows);
      setDataRow(rows);
    }
  };
  useEffect(() => {
    debugger;
    console.log('Orders', Orders);
    makeRows();
  }, []);

  return {
    columns: [
      { Header: 'Order Id', accessor: 'orderId', align: 'left' },
      { Header: 'Order Date', accessor: 'orderedDate', align: 'center' },
      { Header: 'Product Name', accessor: 'productName', align: 'left' },
      { Header: 'Type', accessor: 'productType', align: 'center' },
      {
        Header: 'Pin Code',
        accessor: 'pinCode',
        align: 'center',
      },
      { Header: 'STATUS', accessor: 'status', align: 'center' },
      { Header: 'PROGRESS', accessor: 'progress', align: 'center' },
      { Header: 'Revenue', accessor: 'revenue', align: 'center' },
    ],

    rows: dataRows,
  };
}

export default index;
