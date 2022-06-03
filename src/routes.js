import Icon from "@mui/material/Icon";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import CancelledLayout from "layouts/cancelledOrdersLayout";
import Dashboard from "layouts/dashboard";
import ProfileLayout from "layouts/profile";
import ReturnsLayout from "layouts/returnedOrdersLayout";
import Settlements from "layouts/settlements";
import AddProduct from "./layouts/addProduct/index";
import Inventory from "./layouts/inventory/index";
import OrderLayout from "./layouts/orderLayout/index";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Inventory",
    key: "inventory",
    icon: <Icon fontSize="small">Inventory</Icon>,
    route: "/inventory",
    component: <Inventory />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "add-product",
    icon: <Icon fontSize="small">add-product</Icon>,
    route: "/add-product",
    component: <AddProduct />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">Orders</Icon>,
    route: "/orders",
    component: <OrderLayout />,
  },
  {
    type: "collapse",
    name: "Settlements",
    key: "settlements",
    icon: <Icon fontSize="small">Settlements</Icon>,
    route: "/settlements",
    component: <Settlements />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <ProfileLayout />,
  },
  {
    type: "divider",
    name: "Sign In",
    key: "activeOrder",
    icon: <Icon fontSize="small">ActiveOrder</Icon>,
    route: "/orders/active-orders",
    component: <OrderLayout />,
  },
  {
    type: "title",
    name: "Sign In",
    key: "returns",
    icon: <Icon fontSize="small">Returns</Icon>,
    route: "/orders/returns",
    component: <ReturnsLayout />,
  },
  {
    type: "title",
    name: "Sign In",
    key: "cancellations",
    icon: <Icon fontSize="small">Cancellations</Icon>,
    route: "/orders/canceled",
    component: <CancelledLayout />,
  },
];
export const basicRoutes = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Images",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
