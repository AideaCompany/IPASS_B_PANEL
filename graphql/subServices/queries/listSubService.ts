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
