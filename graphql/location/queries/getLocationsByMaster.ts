export const getLocationsByMaster = /* GraphQL */ `
  query getLocationsByMaster($_id: String) {
    getLocationsByMaster(_id: $_id) {
      _id
      address
      name
      typeCheck
      createdAt
      updatedAt
      state
      deletedDate
    }
  }
`
