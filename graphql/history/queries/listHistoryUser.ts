export const listHistoryUser = /* GraphQL */ `
  query listHistoryUser {
    listHistoryUser {
      _id
      name
      lastname
      email
      privilegeID {
        _id
        name
        permissions {
          sectionID
          read
          create
          delete
          update
        }
        createdAt
        updatedAt
      }
      active
      token
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
      admin {
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
      canCreateHost
      allEventWithAuth
      state
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
      createdAt
      updatedAt
    }
  }
`
