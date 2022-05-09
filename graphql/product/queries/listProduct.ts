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
      services {
        _id
        plus
        name
        abbreviation
        type {
          _id
          name
        }
        products {
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
        subService {
          _id
          plus
          name
          abbreviation
          eta
          price
          cost
          subServiceFee
          taxes
          discounts
          subServiceTime
          returnTime
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      designedFor
    }
  }
`
