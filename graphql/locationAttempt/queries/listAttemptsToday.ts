export const listAttemptsToday = /* GraphQL */ `
  query listAttemptsToday {
    listAttemptsToday {
      _id
      authenticated
      worker {
        _id
        name
        lastname
        email
        verifyLogin
        active
        phone
        document
        typeDocument
        QR
        temporal_Qr {
          QR
          worker
          timeEnd
          used
          valid
        }
        canAccessToApp
        canAccessToWeb
        group {
          _id
          name
          exists
          abbreviation
        }
        nativeLocation {
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
        createdAt
        updatedAt
      }
      attempts
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
      createdAt
      updatedAt
    }
  }
`
