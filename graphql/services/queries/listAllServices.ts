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
      stores {
        _id
        name
        address
        schedule {
          _id
          name
          start
          end
          days
          abbreviation
          createdAt
          updatedAt
        }
        services {
          _id
          plus
          name
          abbreviation
          eta
          price
          cost
          serviceFee
          taxes
          discounts
          serviceTime
          sex
          returnTime
          createdAt
          updatedAt
        }
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
