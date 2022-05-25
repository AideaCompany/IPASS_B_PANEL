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
          serviceFee
          taxes
          discounts
          serviceTime
          returnTime
          sex
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
