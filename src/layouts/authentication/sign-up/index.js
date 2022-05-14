// react-router-dom components
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Signup from "pages/authentication/sign-up";

function Cover() {
  return (
    <CoverLayout>
      <Signup />
    </CoverLayout>
  );
}

export default Cover;
