export const updateContact = /* GraphQL */ `
  mutation updateContact($input: updateContactInput) {
    updateContact(input: $input) {
      _id
      firstName
      lastName
      email
      phone
      nickname
      host {
        _id
        name
        lastName
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active

        token
        createdAt
        updatedAt
      }
      verified
      typeVerified
      verifiedData {
        photo
        documentA
        documentB
        birthDate
        expirationDate
        sex
        lastName
        firstName
        nationality
        documentNumber
        correctionName
        correctionLastname
        correctionNumber
      }
      verifiedDataPDF {
        photo
        documentA
        documentB
        num1
        type
        name
        expedition
        expiration
        licNum
        num2
      }
      createdAt
      updatedAt
    }
  }
`
