/* eslint-disable no-unused-vars */

// Images
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import SignIn from "pages/authentication/sign-in";
// import SimpleFormExample from "pages/Authentication/auth";
// import MaterialUiForm from 'pages/Authentication/test'
import { useCallback } from "react";

function Basic() {
  return useCallback(
    <CoverLayout>
      <SignIn />
      {/* <SimpleFormExample /> */}
    </CoverLayout>
  );
}

export default Basic;
