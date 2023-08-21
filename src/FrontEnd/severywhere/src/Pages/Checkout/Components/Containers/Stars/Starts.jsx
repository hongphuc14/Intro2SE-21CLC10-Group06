import React from 'react'

export default function Starts({
    number
}) {
    const [star, setStar] = React.useState(0)
    React.useEffect(() => {
        if (number) {
            setStar(Math.round(number))
        }
    }, [star])
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {
                Array.from(Array(5).keys()).map((item, index) => {
                    return (
                        <img
                            src={star > index ? './icons/star.svg' : './icons/star_none.svg'}
                            alt="star"
                            key={index}
                            style={{
                                width: '20px',
                                height: '20px',
                                marginRight: '5px',
                            }}
                        />
                    )
                }
            )
            }
        </div>
    )
}
