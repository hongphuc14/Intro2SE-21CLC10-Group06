import React from 'react'

export default function UserInformationFieldWrapper(
    {
        children,
        direction = 'row',
    }
) {
  return (
    <div
        style={{
            width: '100%',
            display: 'flex',
            flexDirection: direction,
            justifyContent: 'space-between',
        }}
    >
        {children}
    </div>
  )
}
