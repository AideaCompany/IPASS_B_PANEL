export const listEvent = /* GraphQL */ `
  query listEvent {
    listEvent {
      _id
      name
      start
      host {
        _id
        name
        lastname
        email
      }
      end
      location {
        _id
        serialNumber
        address
        name
      }
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
    }
  }
`
