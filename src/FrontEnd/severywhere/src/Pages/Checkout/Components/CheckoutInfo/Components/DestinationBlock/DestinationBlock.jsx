import React from 'react'
import DestinationBlockWrapper from '../../../Containers/DestinationBlockWrapper'
import DestinationImage from './Components/DestinationImage/DestinationImage'
import DestinationCard from './Components/DestinationCard/DestinationCard'

export default function DestinationBlock() {
  return (
    <DestinationBlockWrapper>
        <DestinationImage
            image={'./images/destinationimg.jpg'}
        />
        <DestinationCard/>
    </DestinationBlockWrapper>
  )
}
