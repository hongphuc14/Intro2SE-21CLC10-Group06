import React from 'react'

export default function CheckoutSummaryWrapper({children}) {
  return (
    <div
        style={{
            width: '30%',
        }}
    >
        {children}
    </div>
  )
}
