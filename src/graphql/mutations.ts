import { gql } from 'graphql-request'

export const createBusiness = gql`
  mutation CreateBusiness($data: BusinessInput!) {
    createBusiness(data: $data) {
      firebaseID
      phoneNumber
      email
      lastName
      firstName
    }
  }
`

export const updateBusiness = gql`
  mutation UpdateBusiness($data: BusinessInput!, $id: ID!) {
    business: updateBusiness(data: $data, id: $id) {
      name
      salonNumber
      phoneNumber
      smsPhoneNumber
      isMobileBusiness
      streetAddress
      city
    }
  }
`
