export const updateEvent = /* GraphQL */ `
  mutation updateEvent($input: updateEventInput) {
    updateEvent(input: $input) {
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
      }
      end
      location {
        _id
        masterLocation {
          _id
          name
          address
          onlyAllowAuthUSers
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
        }
        typeCheck
        device {
          _id
          name
          type
          serialNumber
          status
          enableVideo
          enableTalk
          timeWait
        }
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
        }
      }
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
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
      }
    }
  }
`
