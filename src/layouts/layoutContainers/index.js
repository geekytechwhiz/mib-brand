/* eslint-disable react/function-component-definition */
// const { default: DashboardLayout } = require("./DashboardLayout")
import DashboardLayout from "./DashboardLayout";

const layoutContainer =
  (Components) =>
  ({ ...props }) =>
    (
      <DashboardLayout>
        <Components {...props} />
      </DashboardLayout>
    );

export default layoutContainer;
