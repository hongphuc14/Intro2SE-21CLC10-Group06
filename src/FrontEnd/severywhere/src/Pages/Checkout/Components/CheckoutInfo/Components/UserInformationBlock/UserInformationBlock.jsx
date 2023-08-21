import React from 'react'
import UserInformationWrapper from '../../../Containers/UserInformationBlockWrapper'
import UserInformationFiled, { inputFieldType } from './Components/UserInformationField/UserInformationFiled'
import { styled } from 'styled-components'

export default function UserInformationBlock() {
  return (
    <UserInformationWrapper>
      <Row>
        <UserInformationFiled
          label="Full Name"
          fieldType={inputFieldType.text}
          placeholder='Phan My Linh'
        />
        <Separator />
        <UserInformationFiled
          label="Email"
          fieldType={inputFieldType.text}
          placeholder='mylin@gmail.com'
        />
      </Row>
      <Row>  
        <UserInformationFiled
          label="Phone"
          fieldType={inputFieldType.text}
          placeholder='+84902223344'
        />
        <Separator />
        <UserInformationFiled
            label="Gender"
            fieldType={inputFieldType.checkbox}
            data={[
                {
                    label :'Male',
                    value :0,
                },
                {
                    label :'Female',
                    value :1,
                }
            ]}
        />
      </Row>
      <Row>
        <UserInformationFiled
          fieldType={inputFieldType.period}
        />
      </Row>
      <Row>
        <UserInformationFiled
          label="Number of tickets"
          fieldType={inputFieldType.amount}
          wrapTitle={false}
        />
        <Separator />
        <UserInformationFiled
          fieldType={inputFieldType.showValue}
          value={1000000}
        />
      </Row>
    </UserInformationWrapper>
  )
}
const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
const Separator = styled.div`
    width: 50px;
`