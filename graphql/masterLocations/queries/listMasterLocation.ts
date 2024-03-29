export const listMasterLocation = /* GraphQL */ `
  query listMasterLocation {
    listMasterLocation {
      _id
      name
      address
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
          lastName
          email
          active

          token
          createdAt
          updatedAt
        }
        host {
          _id
          name
          lastName
          email
          active

          token
          createdAt
          updatedAt
        }
        security {
          _id
          name
          lastName
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
          lastName
          email
          active

          token
          createdAt
          updatedAt
        }
      }
      onlyAllowAuthUSers
      createdAt
      updatedAt
      state
      deletedDate
      whoDeleted {
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

        token
        createdAt
        updatedAt
      }
    }
  }
`
