import React from 'react'

export default function DestinationBlockWrapper({children}) {
  return (
    <div
        style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            height: '300px',
            backgroundColor: '#E5F2CA',
        }}
    >{children}</div>
  )
}
