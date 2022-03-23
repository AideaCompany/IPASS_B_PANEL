export const verifyContact = /* GraphQL */ `
  mutation verifyContact($contactID: ID) {
    verifyContact(contactID: $contactID) {
      _id
      firstName
      lastName
      email
      phone
      nickname
      createdAt
      updatedAt
    }
  }
`
