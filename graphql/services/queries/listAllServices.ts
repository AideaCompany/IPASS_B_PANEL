export const listAllServices = /* GraphQL */ `
  query listAllServices {
    listAllServices {
      _id
      plus
      name
      abbreviation
      type {
        _id
        name
      }
      products {
        product {
          _id
          name
          abbreviation
          brand
          productType
          price
          measureType
          amount
          designedFor
        }
        productQuantity
      }
      eta
      price
      cost
      serviceFee
      taxes
      discounts
      serviceTime
      sex
      returnTime
      photo {
        filename
        key
      }
      stores
      createdAt
      updatedAt
    }
  }
`
