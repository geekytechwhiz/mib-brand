import Icon from "@mui/material/Icon";
import SignIn from "layouts/authentication/sign-in";
import ResetPassword from "layouts/authentication/reset-password/index";
import SignUp from "layouts/authentication/sign-up";
import CancelledLayout from "layouts/cancelledOrdersLayout";
import Dashboard from "layouts/dashboard";
import ProfileLayout from "layouts/profile";
import ReturnsLayout from "layouts/returnedOrdersLayout";
import Settlements from "layouts/settlements";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
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
    // icon: <Icon fontSize="small">Inventory</Icon>,
    icon: <Inventory2OutlinedIcon />,
    route: "/inventory",
    component: <Inventory />,
  },
  {
    type: "collapse",
    name: "Add Product",
    key: "add-product",
    icon: <AddBoxOutlinedIcon>add-product</AddBoxOutlinedIcon>,
    route: "/add-product",
    component: <AddProduct />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    icon: <ShoppingCartOutlinedIcon>Orders</ShoppingCartOutlinedIcon>,
    route: "/orders",
    component: <OrderLayout />,
  },
  {
    type: "collapse",
    name: "Settlements",
    key: "settlements",
    icon: <PaymentOutlinedIcon>Settlements</PaymentOutlinedIcon>,
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
    name: "Reset Password",
    key: "sign-in",
    icon: <Icon fontSize="small">Reset Password</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPassword />,
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
