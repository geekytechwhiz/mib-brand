/* eslint-disable no-debugger */
// import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

function index() {
  const Orders = [
    {
      orderId: 545454,
      productName: "AAA BB CCC",
      orderedDate: "04/05/2022 : 10:59:45",
      productType: "Exclusive",
      shippingAddress: "Kakkanad, Kochi",
      pinCode: 6565664,
      status: "Order Placed",
      invoice: "",
    },
  ];
  const columns = {
    settlementDate: "",
    settlementId: "",
    transactionId: "",
    productName: "",
    amount: "",
    paymentMode: "",
    status: "",
  };
  const [dataRows, setDataRow] = useState([columns]);
  const createColumn = (column) => {
    <MDTypography
      component="a"
      href="#"
      variant="button"
      color="text"
      fontWeight="medium"
    >
      {column.value}
    </MDTypography>;
  };
  function ProductName(element) {
    const { name } = element;
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={LogoAsana} name={name} size="sm" variant="rounded" />
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
          ml={1}
          lineHeight={1}
        >
          {name}
        </MDTypography>
      </MDBox>
    );
  }

  // function Invoice(element) {
  //   return (
  //     <MDBox display="flex" alignItems="center" lineHeight={1}>
  //       <MDTypography
  //         display="block"
  //         variant="button"
  //         fontWeight="medium"
  //         ml={1}
  //         lineHeight={1}
  //       >
  //         <FileDownloadOutlinedIcon
  //           onClick={() => {
  //             alert("clicked");
  //           }}
  //         />
  //       </MDTypography>
  //     </MDBox>
  //   );
  // }

  function Status(element) {
    const { status } = element;
    const value = 60;
    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value} %
        </MDTypography>
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color="info" value={status} />
        </MDBox>
      </MDBox>
    );
  }
  const makeRows = () => {
    const dataset = Orders;
    const rows = [];
    if (dataset && dataset.length > 0) {
      const orders = dataset.forEach((element) => {
        const keys = Object.keys(columns);
        const ele = {};
        keys?.forEach((x) => {
          if (x === "productName") {
            ele[x] = ProductName(element);
          } else if (x === "status") {
            ele[x] = Status(element);
          } else {
            ele[x] = createColumn(element);
          }
        });
        rows.push(ele);
        console.log("Element", ele);
      });
      console.log("orders", orders);
      setDataRow(rows);
    }
  };
  useEffect(() => {
    debugger;
    makeRows();
  }, []);

  return {
    columns: [
      { Header: "Settlement Id", accessor: "settlementId", align: "left" },
      { Header: "Transaction Id", accessor: "transactionId", align: "left" },
      { Header: "Date", accessor: "settlementDate", align: "center" },
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Amount", accessor: "amount", align: "center" },
      { Header: "STATUS", accessor: "status", align: "center" },
      { Header: "Payment Mode", accessor: "paymentMode", align: "center" },
    ],

    rows: dataRows,
  };
}
export default index;
