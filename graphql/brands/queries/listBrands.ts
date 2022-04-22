export const listBrands = /* GraphQL */ `
  query listBrands {
    listBrands {
      _id
      name
      logo {
        filename
        key
      }
    }
  }
`
