export const listProduct = /* GraphQL */ `
  query listProduct {
    listProduct {
      _id
      name
      abbreviation
      brand {
        _id
        name
        logo {
          filename
          key
        }
      }
      photo {
        filename
        key
      }
      productType
      price
      measureType
      amount
      services
      designedFor
    }
  }
`
