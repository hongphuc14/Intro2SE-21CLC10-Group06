import React from 'react'
import UserInformationFieldWrapper from '../../../../../Containers/UserInformationFieldWrapper'
import InputText from '../../../../../../../../Components/Input/Text'
import CheckBoxs from '../../../../../../../../Components/Input/CheckBox'
import InputDateCustom from '../../../../../../../../Components/Input/Date/InputDateCustom.main'
import { styled } from 'styled-components'
import Amount from '../../../../../../../../Components/Input/Amount'


export const inputFieldType = {
    text: 'text',
    checkbox: 'checkbox',
    amount : 'amount',
    date : 'date',
    period : 'period',
    showValue : 'showValue',
}
export default function UserInformationFiled({
    label,
    value, // if fieldType is checkbox, value is array else is string
    onChange = () => {},
    fieldType = inputFieldType.text,
    placeholder = '',
    required = false,
    data = [],
    wrapTitle = true,
}) {

  return (
    <UserInformationFieldWrapper>
      {
        fieldType === inputFieldType.text && (
          <FieldContainer
            flexDirection={wrapTitle ? 'column' : 'row'}
          >
            <Label>{label}</Label>
            <InputText
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
            />
          </FieldContainer>
        )
      }
      {
        fieldType === inputFieldType.checkbox && (
          <FieldContainer
            flexDirection={wrapTitle ? 'column' : 'row'}
          >
            <Label>{label}</Label>
            <CheckBoxs
              data={data}
              value={value}
            />
          </FieldContainer>
        )
      }
      {
        // Chọn ngày only
        fieldType === inputFieldType.date && (
          <InputDateCustom/>
        )
      }
      
      {
        // Từ ngày đến ngày
        fieldType === inputFieldType.period && (
         <FieldContainer
            spaceBetween
          >
            <Label>Start date:</Label>
            <InputDateCustom/>
            <Label>End date:</Label>
            <InputDateCustom/>
         </FieldContainer>
        )
      }

      {
        // Số lượng
        fieldType === inputFieldType.amount && (
          <FieldContainer
            flexDirection={wrapTitle ? 'column' : 'row'}
            spaceBetween
          >
            <Label>{label}</Label>
            <Amount/>
          </FieldContainer>
        )
      }

      {
        // Hiển thị giá trị
        fieldType === inputFieldType.showValue && (
          <FieldContainer>
            <Label>Amount:</Label>
            <div
              style={{
                fontSize: '20px',
                fontWeight: '500',
                color: '#0C721F',
              }}
            >
              {value}
            </div>
          </FieldContainer>
        )
      }
    </UserInformationFieldWrapper>
  )
}

const FieldContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection || 'row'};
    align-items: ${props => props.flexDirection ? 'flex-start' : 'center'};
    margin-bottom: 20px;
    width: 100%;
    justify-content: ${props => !props.spaceBetween ? 'flex-start' : 'space-between'};
`

const Label = styled.label`
    font-size: 20px;
    color: #000000;
    text-transform: capitalize;
`