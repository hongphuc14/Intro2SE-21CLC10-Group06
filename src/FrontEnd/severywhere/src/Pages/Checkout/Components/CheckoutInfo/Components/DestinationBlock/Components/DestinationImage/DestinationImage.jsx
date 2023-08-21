import React from 'react'

export default function DestinationImage({
    image,
}) {
  return (
    <div
        style={{
            width: 'auto',
            height: '100%',
          
        }}
    >
        <img
            src={image}
            alt="destination"
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    </div>
  )
}
