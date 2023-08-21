import React from 'react'

export default function UserInformationWrapper({children}) {
  return (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',   
            backgroundColor: '#ECECEC',
            padding: '20px',
            overflow: 'hidden',
        }}
    >{children}</div>
  )
}
