import React from 'react' 
import '../index.scss'
export default function InputText(
    {
        value,
        onChange,
        placeholder = '',
        required = false,
    }
) {
  return (
    <div
        style={{
           
            width: '100%',
        }}
    >
        <input
            className='input-text'
            type="text"
            value={value}
            onChange={onChange}
            style={{
                height: '52px',
                width: '-webkit-fill-available',
                border: '1px solid #9C9C9C',
                borderRadius: '10px',
                // Inner padding 0
                padding: '0 10px 0 10px',
                maxWidth: '400px',
            }}
            placeholder={placeholder}
            required={required}
        />
    </div>
  )
}
