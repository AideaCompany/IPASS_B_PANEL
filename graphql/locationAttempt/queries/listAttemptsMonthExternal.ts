export const listAttemptsMonthExternal = /* GraphQL */ `
  query listAttemptsMonthExternal {
    listAttemptsMonthExternal {
      _id
      authenticated
      worker {
        _id
        name
        lastName
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
        canUseAuthenticator
        banFinish
        timeZone {
          _id
          name
          start
          end
          days
          abbreviation
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      user {
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
        canUseAuthenticator
        timeZone {
          _id
          name
          start
          end
          days
          abbreviation
          createdAt
          updatedAt
        }
        banFinish
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
          lastName
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
          banFinish
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
      location {
        _id
        masterLocation {
          _id
          name
          address
          onlyAllowAuthUSers
          tree
          createdAt
          updatedAt
          state
          deletedDate
        }
        childLocations {
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
        parentLocations {
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
        address
        name
        admins {
          _id
          name
          lastName
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
          banFinish
        }
        host {
          _id
          name
          lastName
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
          banFinish
        }
        security {
          _id
          name
          lastName
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
          banFinish
        }
        typeCheck
        device {
          _id
          name
          type
          serialNumber
          status
          exists
          enableVideo
          enableTalk
          timeWait
        }
        createdAt
        updatedAt
        state
        abbreviation
        deletedDate
        whoDeleted {
          _id
          name
          lastName
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
          banFinish
        }
      }
      type
      createdAt
      updatedAt
    }
  }
`
