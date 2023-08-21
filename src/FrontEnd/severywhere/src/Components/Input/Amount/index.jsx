import React from 'react'

const Button = ({
    icon = null,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                cursor: 'pointer',
            }}
        >
            <img src={icon} alt="icon" 
                style={{
                    width: '15px',
                    height: '15px',
                }}
            />
        </div>
    )
}

export default function Amount() {
  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '150px',
            height: '40px',
            borderRadius: '10px',
            border: '1px solid #9C9C9C',
            padding: '0 10px',
            backgroundColor: '#fff',
        }}
    >
        <Button icon={'/icons/minus.svg'} />
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            1
        </div>
        <Button icon={'/icons/plus.svg'} />
    </div>
  )
}
