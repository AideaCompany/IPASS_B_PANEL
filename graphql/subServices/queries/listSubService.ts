export const listSubService = /* GraphQL */ `
  query listSubService($page: Int, $limit: Int, $filters: Any) {
    listSubService(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        plus
        name
        abbreviation
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
        subServiceFee
        taxes
        discounts
        subServiceTime
        returnTime
        photo {
          filename
          key
        }
        stores
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
