export const getUser = /* GraphQL */ `
  query getUser($_id: String) {
    getUser(_id: $_id) {
      _id
      name
      lastname
      email
      photo {
        filename
        key
      }
      privilegeID {
        _id
        name
        permissions {
          sectionID
          read
          create
          delete
          update
        }
        createdAt
        updatedAt
      }
      active
      token
      createdAt
      updatedAt
    }
  }
`
