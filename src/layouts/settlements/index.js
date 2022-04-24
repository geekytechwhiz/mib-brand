import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Footer from "layouts/footer";
// Material Dashboard 2 React example components
import DashboardLayout from "layouts/layoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDNavbar/DashboardNavbar";
import DataTable from "components/RTable";
import settlementTable from "../../pages/Settlement/index";

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
