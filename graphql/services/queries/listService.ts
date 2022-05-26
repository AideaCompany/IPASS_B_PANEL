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
