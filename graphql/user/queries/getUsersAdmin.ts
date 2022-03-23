export const getUsersAdmin = /* GraphQL */ `
  query getUsersAdmin {
    getUsersAdmin {
      _id
      name
      lastname
      email
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
