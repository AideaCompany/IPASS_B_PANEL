export const getUserHost = /* GraphQL */ `
  query getUserHost {
    getUserHost {
      _id
      name
      lastname
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
