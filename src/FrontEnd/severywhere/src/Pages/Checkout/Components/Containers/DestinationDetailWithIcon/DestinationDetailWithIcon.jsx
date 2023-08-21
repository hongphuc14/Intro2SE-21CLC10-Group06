import React from 'react'

export default function DestinationDetailWithIcon({
    icon = './images/destinationicon.png',
    children,
    direction = 'row', // row | column
}) {
  return (
    <div
        style={{
            width: '100%',
            display: 'flex',
            flexDirection: direction,
        }}
    >
      <img
        src={icon}
      />
     {children}
    </div>
  )
}
