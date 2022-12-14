import { gql } from 'graphql-request'

export const createBusiness = gql`
  mutation CreateBusiness($data: BusinessInput!) {
    createBusiness(data: $data) {
      firebaseID
      phoneNumber
      password
      email
      lastname
      firstname
    }
  }
`
