export const createEventExpress = /* GraphQL */ `
  mutation createEventExpress($input: EventExpressInput) {
    createEventExpress(input: $input) {
      _id
      name
      host {
        _id
        name
        lastname
        email
      }
      start
      end
      location {
        _id
        address
        name
        typeCheck
        createdAt
        updatedAt
        state
        abbreviation
        deletedDate
      }
      state
      createdAt
      updatedAt
      contact {
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
          active
          country
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
          canUseAuthenticator
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
        banFinish
        createdAt
        updatedAt
        empresa
      }
    }
  }
`
