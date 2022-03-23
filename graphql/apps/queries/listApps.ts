export const listApps = /* GraphQL */ `
  query listApps {
    listApps {
      _id
      name
      url
      abbreviation
      clientID
      tokenKey
      createdAt
      updatedAt
    }
  }
`
