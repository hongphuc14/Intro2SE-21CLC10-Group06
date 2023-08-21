import React from 'react'
import CheckoutInfoWrapper from '../Containers/CheckoutInfoWrapper'
import DestinationBlock from './Components/DestinationBlock/DestinationBlock'
import UserInformationBlock from './Components/UserInformationBlock/UserInformationBlock'

export default function CheckoutInfo() {
    // Add form to collect user info
    return (
        <CheckoutInfoWrapper>
            <DestinationBlock />
            <UserInformationBlock />
        </CheckoutInfoWrapper>
    )
}
