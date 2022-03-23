export const listLocationActive = /* GraphQL */ `
  query listLocationActive {
    listLocationActive {
      _id
      masterLocation {
        _id
        name
        address
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
        onlyAllowAuthUSers
        tree
        createdAt
        updatedAt
        state
        deletedDate
        whoDeleted {
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
      }
      childLocations {
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
        security {
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
      }
      parentLocations {
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
        security {
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
      }
      address
      name
      admins {
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
      security {
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
      typeCheck
      device {
        _id
        name
        type
        serialNumber
        status
        exists
        actualLocation {
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
    }
  }
`
