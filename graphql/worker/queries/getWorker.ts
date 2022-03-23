export const getWorker = /* GraphQL */ `
  query getWorker($_id: String) {
    getWorker(_id: $_id) {
      _id
      name
      lastname
      document
      typeDocument
      email
      verifyLogin
      active
      phone
      createdAt
      updatedAt
    }
  }
`
