import React from 'react'

export default function CheckoutInfoWrapper({children}) {
  return (
    <div
        style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '10px',
        }}
    >
        {children}
    </div>
  )
}
