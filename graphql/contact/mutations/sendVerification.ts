export const sendVerification = /* GraphQL */ `
  mutation sendVerification($contactID: ID) {
    sendVerification(contactID: $contactID) {
      _id
      firstName
      lastName
      email
      phone
      nickname
      verified
      typeVerified
      banFinish
      createdAt
      updatedAt
      empresa
      DPI
    }
  }
`
