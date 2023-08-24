import './CheckoutTour.scss'
import React, { useState, useEffect } from 'react'
import HeaderGuest from '../../Components/Header/HeaderGuest'
import Footer from '../../Components/Footer/Footer'
import CheckOutForm from '../../Components/CheckOutForm/CheckOutForm'

const  CheckoutPage= () => {
    return ( 
        <div className = "checkout-page">
            <HeaderGuest/>
            <CheckOutForm/>
            <Footer/>
        </div>
    );
}
 
export default CheckoutPage;