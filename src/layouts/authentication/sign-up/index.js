// react-router-dom components
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Signup from "pages/Authentication/sign-up";
import Grid from "@mui/material/Grid";
import signupImage from "../../../assets/images/signup.png";

function Cover() {
  return (
    <CoverLayout>
      <Grid item xs={6}>
        <img src={signupImage} width={620} height={520} alt="abc" />
      </Grid>
      <Grid item xs={4}>
        <Signup />
      </Grid>
    </CoverLayout>
  );
}

export default Cover;
