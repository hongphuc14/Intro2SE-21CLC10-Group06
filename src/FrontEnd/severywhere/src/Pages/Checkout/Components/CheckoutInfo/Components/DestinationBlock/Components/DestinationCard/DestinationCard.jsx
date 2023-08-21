import React from 'react'
import DestinationIntroInfoItem from './Components/DestinationIntroInfoItem/DestinationIntroInfoItem'
import Starts from '../../../../../Containers/Stars/Starts'
import DestinationDetailInfoItem from './Components/DestinationDetailInfoItem/DestinationDetailInfoItem'

export default function DestinationCard() {
    return (
        <div
            style={{
                width: '60%',
                backgroundColor: '#E5F2CA',
                padding: '20px',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
            {/* Header */}
            <h1
                style={{
                    fontSize: '30px',
                    textTransform: 'capitalize',
                    padding: '0px',
                    textAlign: 'left',
                }}
            >
                Halong Bay Deluxe Day Tour
            </h1>
            {/* Location Block */}
            <div>
                <DestinationIntroInfoItem
                    icon={'./icons/checkpoint.svg'}
                    text={'Hanoi, Vietnam'}
                />
                <DestinationIntroInfoItem
                    icon={'./icons/building.svg'}
                    text={'By The Tour Company'}
                />
            </div>
            {/* Rateblock */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Starts
                    number={4}
                />
                <div
                    style={{
                        fontSize: '22px',
                        textTransform: 'capitalize',
                        color: '#9C9C9C',
                        marginLeft: '10px',
                    }}
                > 
                    <span>4</span>
                    <span
                        style={{
                            marginLeft: '5px',
                        }}
                    >(203 Reviews)</span>
                </div>

            </div>
            {/* Tour info */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <DestinationDetailInfoItem
                    icon={'./icons/dollar.svg'}
                    title={'Cost per person'}
                    text={'39.00'}
                />    
                <DestinationDetailInfoItem
                    icon={'./icons/time.svg'}
                    title={'Duration'}
                    text={'1 day'}
                />    
                <DestinationDetailInfoItem
                    icon={'./icons/umbrella.svg'}
                    title={'Tour Type'}
                    text={'adventure'}
                />    
            </div>
            </div>
        </div>
    )
}
