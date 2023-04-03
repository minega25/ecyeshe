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

export const updateBusinessServices = gql`
  mutation UpdateBusinessServices($business: ID!, $service: [ID!]) {
    updateBusiness(id: $business, data: { services: { connect: $service } }) {
      _id
      services {
        data {
          name
        }
      }
    }
  }
`
