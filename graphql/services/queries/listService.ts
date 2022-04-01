export const listService = /* GraphQL */ `
  query listService($page: Int, $limit: Int, $filters: Any) {
    listService(page: $page, limit: $limit, filters: $filters) {
      docs {
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
          productQuantity
        }
        eta
        staffers
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
        subService {
          _id
          plus
          name
          abbreviation
          eta
          staffers
          price
          cost
          subServiceFee
          taxes
          discounts
          subServiceTime
          returnTime
          stores
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      totalDocs
      limit
      page
      totalPages
      pagingCounter
      hasPrevPage
      hasNextPage
      offset
      prevPage
      nextPage
    }
  }
`
