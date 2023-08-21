import React from 'react'

export default function CheckBoxs({
    value = [],
    onChange = () => {},
    data = [], // [{label: 'label', value: 'value'}]
    style = {},
}) {
    const [renderVal, setRenderVal] = React.useState(null)
    React.useEffect(() => {
        if (renderVal === null) {
            setRenderVal(value)
        }
    }, [value])
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                ...style,
            }}
        >
            {data.map((item, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={renderVal && renderVal.includes(item.value)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setRenderVal([...renderVal, item.value])
                                } else {
                                    setRenderVal(
                                        renderVal.filter(
                                            (val) => val !== item.value
                                        )
                                    )
                                }
                                onChange(renderVal)
                            }}
                        />
                        <label
                            style={{
                                marginLeft: '10px',
                                color: '#9C9C9C',
                            }}
                        >
                            {item.label}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}
