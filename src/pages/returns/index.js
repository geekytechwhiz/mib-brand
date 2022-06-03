/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import React, { memo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import DeliveredReturns from "./delivered";
import InTransitReturns from "./inTransit";
import NewReturns from "./newReturns";
import ReadyForPickup from "./readyForPickup";

function ReturnOrders() {
  let count = {
    newReturns: 0,
    approved: 0,
    rfp: 0,
    inTransit: 0,
    delivered: 0,
  };
  const [value, setValue] = useState("0");
  const brandInfo =
    useSelector((state) => state.auth.accountInfo, shallowEqual) || [];

  const returnsData = useSelector(
    (state) => state.orderState.returns,
    shallowEqual
  ) || {
    RETURNED: [],
    RETURNED_READY_FOR_PICKUP: [],
    IN_TRANSIT: [],
    DELIVERED: [],
  };

  if (returnsData) {
    count = {
      newReturns: (returnsData.RETURNED && returnsData.RETURNED?.length) || 0,
      rfp:
        (returnsData.RETURNED_READY_FOR_PICKUP &&
          returnsData.RETURNED_READY_FOR_PICKUP?.length) ||
        0,
      inTransit:
        (returnsData.IN_TRANSIT && returnsData.IN_TRANSIT?.length) || 0,
      delivered: (returnsData.DELIVERED && returnsData.DELIVERED?.length) || 0,
      all: (returnsData.DELIVERED && returnsData.DELIVERED?.length) || 0,
    };
  }
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const switchTabs = (e, val) => {
    setValue(val);
  };

  return (
    <div>
      <Card>
        <MDBox pt={3}>
          <TabContext value={value}>
            <MDBox
              sx={{
                maxWidth: "80%",
              }}
            >
              <TabList onChange={handleChange} aria-label="return-orders">
                <Tab label={`New Returns (${count.newReturns})`} value="0" />
                <Tab label={`Ready For Pickup (${count.rfp})`} value="1" />
                <Tab label={`In Transit (${count.inTransit})`} value="2" />
                <Tab label={`Delivered (${count.inTransit})`} value="3" />
              </TabList>
            </MDBox>
            <TabPanel value="0">
              <NewReturns
                activeTab={switchTabs}
                orders={returnsData.RETURNED || []}
                brandInfo={brandInfo}
              />
            </TabPanel>
            <TabPanel value="1">
              <ReadyForPickup
                activeTab={switchTabs}
                orders={returnsData.RETURNED_READY_FOR_PICKUP || []}
                brandInfo={brandInfo}
              />
            </TabPanel>
            <TabPanel value="2">
              <InTransitReturns
                activeTab={switchTabs}
                orders={returnsData.IN_TRANSIT || []}
              />
            </TabPanel>
            <TabPanel value="3">
              <DeliveredReturns
                activeTab={switchTabs}
                orders={returnsData.DELIVERED || []}
              />
            </TabPanel>
          </TabContext>
        </MDBox>
      </Card>
    </div>
  );
}

export default memo(ReturnOrders);
