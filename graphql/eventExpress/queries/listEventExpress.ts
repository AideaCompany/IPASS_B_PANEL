export const listEventExpress = /* GraphQL */ `
  query listEventExpress {
    listEventExpress {
      _id
      name
      hourIn
      open
      hourOut
      authorizedBy {
        _id
        name
        lastname
      }
      invitados {
        _id
        firstName
        lastName
        email
        phone
      }
      motivo
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
        verified
        typeVerified
        DPI
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
