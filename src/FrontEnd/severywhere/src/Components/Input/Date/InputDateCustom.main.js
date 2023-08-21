import React, { useCallback } from 'react'
import { InputForm, TextError } from './InputDateCustom.Style'

function InputDateCustom({ 
    placeholder,
    value,
    onChange,
    textError,
    className,
}, ref) {

    const handleChangeValue = useCallback((text) => {
        onChange && onChange(text);
    }, [onChange]);
    

    return (
        <div className={`position-relative w-100 h-auto ${className}`}>
            <InputForm 
                ref={ref}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    handleChangeValue(e.target.value);
                }}
                type="date"
            />
            {
                textError && <TextError>{ textError }</TextError>
            }
        </div>
    )
}

export default React.memo(React.forwardRef(InputDateCustom));