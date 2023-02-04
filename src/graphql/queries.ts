import { gql } from 'graphql-request'

export const getBusinessInfo = gql`
  query ($email: String!) {
    allBusinessesByEmail(email: $email) {
      data {
        firstName
        lastName
        email
        phoneNumber
        smsPhoneNumber
        firebaseID
        marketingStrategy
        name
        salonNumber
        streetAddress
        city
        profession
        speciality
        aboutMe
        isMobileBusiness
        _id
      }
    }
  }
`
