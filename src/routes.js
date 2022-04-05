// Material Dashboard 2 React layouts
import Icon from '@mui/material/Icon';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';
import Dashboard from 'layouts/dashboard';
import Notifications from 'layouts/notifications';
import Profile from 'layouts/profile';
import Tables from 'layouts/tables';
import Settlements from 'layouts/settlements';
import AddProduct from './layouts/addProduct/index';
import Inventory from './layouts/inventory/index';
import Orders from './layouts/orders/index';
// @mui icons

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: <Dashboard />,
  },
  {
    type: 'collapse ',
    name: 'Tables',
    key: 'tables',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/tables',
    component: <Tables />,
  },
  {
    type: 'collapse',
    name: 'Add Product',
    key: 'add-product',
    icon: <Icon fontSize="small">add-product</Icon>,
    route: '/add-product',
    component: <AddProduct />,
  },
  {
    type: 'collapse',
    name: 'Inventory',
    key: 'inventory',
    icon: <Icon fontSize="small">Inventory</Icon>,
    route: '/inventory',
    component: <Inventory />,
  },
  {
    type: 'collapse',
    name: 'Orders',
    key: 'orders',
    icon: <Icon fontSize="small">Orders</Icon>,
    route: '/orders',
    component: <Orders />,
  },
  {
    type: 'collapse',
    name: 'Settlements',
    key: 'settlements',
    icon: <Icon fontSize="small">Settlements</Icon>,
    route: '/settlements',
    component: <Settlements />,
  },
  {
    type: 'collapse',
    name: 'Notifications',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
    route: '/notifications',
    component: <Notifications />,
  },
  {
    type: 'collapse',
    name: 'Profile',
    key: 'profile',
    icon: <Icon fontSize="small">person</Icon>,
    route: '/profile',
    component: <Profile />,
  },
];
export const basicRoutes = [
  {
    type: 'collapse',
    name: 'Sign In',
    key: 'sign-in',
    icon: <Icon fontSize="small">login</Icon>,
    route: '/authentication/sign-in',
    component: <SignIn />,
  },
  {
    type: 'collapse',
    name: 'Sign Up',
    key: 'sign-up',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/authentication/sign-up',
    component: <SignUp />,
  },
];

export default routes;
