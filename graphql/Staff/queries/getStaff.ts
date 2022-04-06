export const getStaff = /* GraphQL */ `
  query getStaff($_id: String) {
    getStaff(_id: $_id) {
      _id
      name
      name1
      name2
      lastName
      lastName1
      lastName2
      address
      stores
      phone
      phone1
      photo {
        filename
        key
      }
      email
      specialty
      AET
      canAccessToApp
      canAccessToWeb
      client
      active
      tokenExpo
      plus
      verifyLogin
      createdAt
      updatedAt
    }
  }
`
