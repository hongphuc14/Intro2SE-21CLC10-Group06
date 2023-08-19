import React from 'react'

export default function PageContainer({
    children,
}) {
  return (
    <div
        style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
        }}
    >
        {children}
    </div>
  )
}
