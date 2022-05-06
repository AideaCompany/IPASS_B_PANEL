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
        staffers {
          _id
          name
          name1
          name2
          lastName
          lastName1
          lastName2
          address
          phone
          phone1
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
