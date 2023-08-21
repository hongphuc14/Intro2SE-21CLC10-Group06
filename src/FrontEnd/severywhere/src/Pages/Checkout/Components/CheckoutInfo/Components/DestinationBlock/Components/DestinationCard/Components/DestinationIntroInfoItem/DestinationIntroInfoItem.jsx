import React from 'react'
import DestinationDetailWithIcon from '../../../../../../../Containers/DestinationDetailWithIcon/DestinationDetailWithIcon'

export default function DestinationIntroInfoItem(
    {
        text,   
        icon
    }
) {
  return (
    <DestinationDetailWithIcon
      icon={icon}
    >
      <span
        style={{
          fontSize: '22px',
          textTransform: 'capitalize',
          color: '#9C9C9C',
          marginLeft: '10px',
        }}
      >
        {text}
      </span>
    </DestinationDetailWithIcon>
  )
}
