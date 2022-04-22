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
        lastName
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
        lastName
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
