export const listServiceType = /* GraphQL */ `
  query listServiceType {
    listServiceType {
      _id
      name
      description
      logo {
        filename
        key
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
        photo {
          filename
          key
        }
        createdAt
        updatedAt
      }
    }
  }
`
