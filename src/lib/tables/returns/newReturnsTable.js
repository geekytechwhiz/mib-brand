/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images
import { Checkbox } from "@mui/material";
import {
  RefundInfo,
  RefundAction,
  RenderAddressColumn,
  RenderColumn,
  RenderDate,
  RenderReturnProductInfo,
  RenderWarehouseAddress,
  RenderPackageInfo,
  ReturnInfo,
} from "lib/tables/common";
import React from "react";

function NewReturnTable(orders, brandInfo, handleApprove, handleReject) {
  const address = brandInfo && brandInfo.Address;
  const rows = [];
  const resp = {
    ProductName: "",
    OrderDate: "",
    ProductType: "",
    DeliveryAddress: "",
    PinCode: "",
    Status: "",
    Progress: "",
  };
  const keys = Object.keys(resp);
  if (orders && orders.length > 0) {
    orders.forEach((ele) => {
      const obj = { ...ele };
      keys.forEach((key) => {
        if (obj[key] === "OrderDate") {
          const date = obj[key];
        }
        if (!obj[key]) {
          obj[key] = "";
        }
      });
      rows.push(obj);
    });
  }

  const getRows = () => {
    const dataRows = [];

    rows.forEach((element) => {
      const res = {
        ReturnDate: RenderDate(element, "ReturnDate"),
        ReturnInfo: ReturnInfo(element),
        Channel: RenderColumn(element, "Channel"),
        CustomerInfo: RenderAddressColumn(element),
        ProductInfo: RenderReturnProductInfo(element, "ProductInfo"),
        QualityCheck: RenderColumn(element, "QualityCheck"),
        Reason: RenderColumn(element, "Reason"),
        PickupAddress: RenderWarehouseAddress(
          brandInfo.Address,
          brandInfo.BusinessDetails
        ),
        Dimension: RenderPackageInfo(element),
        RefundAmount: RenderColumn(element, "RefundAmount", true),
        RefundInfo: RefundInfo(element, "RefundInfo"),
        Tags: RenderColumn(element, "Tags"),
        Action: RefundAction(handleApprove, handleReject),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <Checkbox type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );
  const response = {
    columns: React.useMemo(
      () => [
        {
          id: "selection",

          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        {
          Header: "Request Date",
          accessor: "ReturnDate",
          align: "left",
          // cell: ({ cell: { value } }) => <RenderDate>{value}</RenderDate>,
        },
        {
          Header: "Return Order Id & Return Status ",
          accessor: "ReturnInfo",
          align: "left",
          width: 200,
        },
        {
          Header: "Channel",
          accessor: "Channel",
          align: "left",
        },
        {
          Header: "Customer Details ",
          accessor: "CustomerInfo",
          width: 150,
          align: "left",
        },
        {
          Header: "Product Details",
          accessor: "ProductInfo",
          align: "left",
          width: 150,
        },
        {
          Header: "Quality Check",
          accessor: "QualityCheck",
          align: "left",
          width: 150,
        },

        {
          Header: "Return Reason",
          width: 150,
          accessor: "Reason",
          align: "left",
        },
        {
          Header: "Warehouse Address",
          accessor: "PickupAddress",
          align: "left",
          width: 200,
        },
        {
          Header: "Dimension & Weight",
          accessor: "Dimension",
          align: "left",
          width: "15rem",
        },
        {
          Header: "Refund Amount",
          accessor: "RefundAmount",
          align: "left",
          width: 100,
        },
        {
          Header: "Refund Mode & Status",
          accessor: "RefundInfo",
          align: "left",
          width: "15rem",
        },
        {
          Header: "Action",
          accessor: "Action",
          align: "center",
          width: "15rem",
        },
      ],
      []
    ),
    rows: getRows(),
  };

  return response;
}

export default NewReturnTable;
