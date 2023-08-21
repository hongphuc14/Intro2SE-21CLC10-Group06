import React from 'react'
import PageContainer from './Components/Containers/PageContainer'
import CheckoutInfo from './Components/CheckoutInfo/CheckoutInfo'
import CheckoutSummary from './Components/CheckoutSummary/CheckoutSummary'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
export default function CheckoutPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
            <HeaderGuest />
              <PageContainer>
                  <CheckoutInfo />
                  <div style={
                        {         
                        width: '2px',
                        height: '595px',
                        backgroundColor: '#ECECEC',
                        margin: '0 20px',
                        }}>
                  </div>
                  <CheckoutSummary/>
              </PageContainer>
            <Footer />
        </div>
    
  )
}
