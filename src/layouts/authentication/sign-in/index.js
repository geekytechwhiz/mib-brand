/* eslint-disable no-unused-vars */

// Images
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import SignIn from "pages/Authentication/Sign-in";
import { useCallback } from "react";

function Basic() {
  return useCallback(
    <CoverLayout>
      <SignIn />
    </CoverLayout>
  );
}

export default Basic;
