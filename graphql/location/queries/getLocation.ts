export const getLocation = /* GraphQL */ `
  query getLocation($_id: String) {
    getLocation(_id: $_id) {
      _id
      abbreviation
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
          deletedDate
        }
        onlyAllowAuthUSers
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
          createdAt
          updatedAt
        }
      }
      childLocations {
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
          createdAt
          updatedAt
        }
      }
      parentLocations {
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
          createdAt
          updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
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
        actualLocation {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
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
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active

        token
        createdAt
        updatedAt
      }
    }
  }
`
