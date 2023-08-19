import React from 'react'
import CheckoutSummaryWrapper from '../Containers/CheckoutSummaryWrapper'
import { ButtonCompleteCheckout } from '../../../../Components/Button/ButtonCompleteCheckout'

export default function CheckoutSummary() {
    // Summary of checkout block
    return (
        <CheckoutSummaryWrapper
        >
            
            {/* Container */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                {/* Header */}
                <h1
                    style={{
                        fontSize: '40px',
                        color: '#0C721F',
                        textTransform: 'uppercase',
                        textAlign: 'start',
                    }}
                >check out</h1>
                {/* Summary */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '210px',
                        justifyContent: 'space-between',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '35px',
                            color: '#0C721F',
                            textTransform: 'uppercase',
                        }}
                    >
                        summary
                    </h2>
                    {/* Price */}
                    <div
                        style={{
                            color: '#9C9C9C',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            fontSize: '22px',
                        }}
                    >
                        <span>Price:</span>
                        <span>$</span>
                    </div>
                   
                     {/* Line */}
                    <div
                        style={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: '#ECECEC',
                        }}
                    />
                    {/* Total */}
                    <div
                        style={{
                            color: '#0C721F',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            fontSize: '22px',
                        }}
                    >
                        <span>Total:</span>
                        <span>$</span>
                    </div>
                    {/* Free cancelation 24hours */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src='icons/verify.svg'
                        />
                        <span
                            style={{
                                color: '#9C9C9C',
                                fontSize: '15px',
                            }}
                        >
                            Free cancellation within 24 hours
                        </span>
                    </div>
                </div>
                {/* Button */}
                <ButtonCompleteCheckout
                    text='complete checkout'
                />
            </div>
        </CheckoutSummaryWrapper>
    )
}
