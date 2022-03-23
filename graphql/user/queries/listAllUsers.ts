export const listAllUsers = /* GraphQL */ `
  query listAllUsers {
    listAllUsers {
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
      verifyLogin
      createdAt
      updatedAt
      canCreateHost
      allEventWithAuth
      canAccessToApp
      canAccessToWeb
      document
      typeDocument
      code
      phone
      QR
    }
  }
`
