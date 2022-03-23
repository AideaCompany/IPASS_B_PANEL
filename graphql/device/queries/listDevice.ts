export const listDevice = /* GraphQL */ `
  query listDevice {
    listDevice {
      _id
      name
      type
      serialNumber
      status
      actualLocation {
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
      enableVideo
      enableTalk
      timeWait
    }
  }
`
