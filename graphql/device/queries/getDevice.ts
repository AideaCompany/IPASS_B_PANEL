export const getDevice = /* GraphQL */ `
  query getDevice($_id: ID!) {
    getDevice(_id: $_id) {
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
  }
`
