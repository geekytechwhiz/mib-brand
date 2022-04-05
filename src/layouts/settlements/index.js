import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import Footer from 'examples/Footer';
// Material Dashboard 2 React example components
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import settlementTable from '../../pages/Settlement/index';

function Settlements() {
  const { columns: pColumns, rows: pRows } = settlementTable();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  setEntriesPerPage={10}
                  canSearch
                  showTotalEntries
                  pagination
                  isSorted
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Settlements;
