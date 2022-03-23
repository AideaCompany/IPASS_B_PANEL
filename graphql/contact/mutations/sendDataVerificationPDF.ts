export const sendDataVerificationPDF = /* GraphQL */ `
  mutation sendDataVerificationPDF($input: verifiedDataInputPDF, $ID: String) {
    sendDataVerificationPDF(input: $input, ID: $ID) {
      _id
      firstName
      lastName
      email
      phone
      nickname
      host {
        _id
        name
        lastname
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active

        token
        verifyLogin
        createdAt
        updatedAt
        canCreateHost
        allEventWithAuth
        canAccessToApp
        canAccessToWeb
        document
        typeDocument
        code
        phone
        QR
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
