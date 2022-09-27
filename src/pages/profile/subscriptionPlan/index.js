/* eslint-disable prettier/prettier */
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import React from 'react'
import SubScriptionPlanCard from './SubScriptionPlanCard'

function SubscriptionPlan(){
    return (
        <MDBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
            <MDTypography
              display="block"
              variant="h6"
              fontWeight="medium"
            >
            Subscription Plan
          </MDTypography>
        <MDBox
          width="100%"
          display="grid"
          gridTemplateColumns="repeat(3,1fr)"
          
        >
           <SubScriptionPlanCard isSubscribed/>
           <SubScriptionPlanCard isSubscribed={false}/>
        </MDBox>
        </MDBox>
    )
}
export default SubscriptionPlan