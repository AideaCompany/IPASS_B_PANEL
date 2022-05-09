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
          productType
          price
          measureType
          amount
          designedFor
        }
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
        subServiceFee
        taxes
        discounts
        subServiceTime
        returnTime
        photo {
          filename
          key
        }

        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
