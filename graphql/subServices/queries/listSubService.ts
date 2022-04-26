export const listSubService = /* GraphQL */ `
  query listSubService($page: Int, $limit: Int, $filters: Any) {
    listSubService(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        plus
        name
        abbreviation
        products {
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
        stores {
          _id
          name
          address
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
