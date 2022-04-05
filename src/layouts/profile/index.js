// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import Footer from 'examples/Footer';
// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// Overview page components
import Header from 'layouts/profile/components/Header';
import Profile from '../../pages/profile/index';

function Overview() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <MDBox mt={5} mb={3} />
      <Profile />
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
