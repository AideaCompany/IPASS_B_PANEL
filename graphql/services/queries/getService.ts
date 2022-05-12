export const getService = /* GraphQL */ `
  query getService($_id: String) {
    getService(_id: $_id) {
      _id
      plus
      name
      abbreviation
      type {
        _id
        name
        logo {
          filename
          key
        }
      }
      products {
        product {
          _id
          name
          abbreviation
          productType
          price
          measureType
          amount
          designedFor
          createdAt
          updatedAt
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
      subService {
        _id
        plus
        name
        abbreviation
        products {
          productQuantity
        }
        type {
          _id
          name
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
        returnTime
        photo {
          filename
          key
        }
        sex
        stores {
          _id
          name
          address
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
