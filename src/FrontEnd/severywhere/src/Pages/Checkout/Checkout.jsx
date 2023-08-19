import React from 'react'
import PageContainer from './Components/Containers/PageContainer'
import CheckoutInfo from './Components/CheckoutInfo/CheckoutInfo'
import CheckoutSummary from './Components/CheckoutSummary/CheckoutSummary'

export default function CheckoutPage() {
  return (
    <PageContainer>
        <CheckoutInfo />
        <CheckoutSummary/>
    </PageContainer>
  )
}
