export const getUserHost = /* GraphQL */ `
  query getUserHost {
    getUserHost {
      _id
      name
      lastName
      email
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
