/* eslint-disable no-unused-vars */

// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout';
import SignIn from 'pages/Authentication/Sign-in';
import { useState } from 'react';

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout>
      <SignIn />
    </CoverLayout>
  );
}

export default Basic;
