import React from 'react'
import DestinationDetailWithIcon from '../../../../../../../Containers/DestinationDetailWithIcon/DestinationDetailWithIcon'

export default function DestinationDetailInfoItem(
    {
        text,   
        icon,
        title,
    }
) {
  return (
    <DestinationDetailWithIcon
      icon={icon}
      direction='row'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '10px',
        }}
      >
        <span
          style={{
            fontSize: '15px',
            textTransform: 'capitalize',
            color: '#9C9C9C',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontSize: '15px',
            textTransform: 'capitalize',
          }}
        >
          {text}
        </span>
      </div>
      
    </DestinationDetailWithIcon>
  )
}
