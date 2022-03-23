export const listAllEventsActive = /* GraphQL */ `
  query listAllEventsActive {
    listAllEventsActive {
      _id
      name
      start
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
      end
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
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
      state
      deletedDate
      invitations {
        _id
        event {
          _id
          name
          start
          end
          beforeStart
          onlyAuthUser
          createdAt
          updatedAt
          state
          deletedDate
        }
        contact {
          _id
          firstName
          lastName
          email
          phone
          nickname
          verified
          typeVerified
          banFinish
          createdAt
          updatedAt
        }
        confirmed
        alreadySendInvitation
        isIn
        hourIn
        type
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
        routes
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
        expiration
        createdAt
        updatedAt
      }
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
