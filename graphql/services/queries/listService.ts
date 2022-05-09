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
            product {
              _id
              name
            }
            productQuantity
          }
          eta
          staffers {
            _id
            name
            lastName
          }
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
