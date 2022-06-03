import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PageLayout from "layouts/layoutContainers/PageLayout";
// Authentication layout components
// import Footer from "layouts/authentication/components/Footer";
import PropTypes from "prop-types";

function CoverLayout({ children, coverHeight }) {
  return (
    <PageLayout>
      <MDBox
        mt={{ xs: 10, lg: 10, md: 10 }}
        px={1}
        width="calc(100% - 5rem)"
        mx="auto"
        height={coverHeight}
      >
        <Grid container spacing={1} justifyContent="space-around">
          {children}
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "100vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
