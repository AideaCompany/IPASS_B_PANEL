export const getUser = /* GraphQL */ `
  query getUser($_id: String) {
    getUser(_id: $_id) {
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
      location {
        _id
        serialNumber
        address
        name
        timeWait
        enableVideo
        enableTalk
        typeLocation
        createdAt
        updatedAt
      }
      admin {
        _id
        name
        lastname
        email
        active
        token
        canCreateHost
        allEventWithAuth
        createdAt
        updatedAt
      }
      canCreateHost
      allEventWithAuth
      createdAt
      updatedAt
    }
  }
`
