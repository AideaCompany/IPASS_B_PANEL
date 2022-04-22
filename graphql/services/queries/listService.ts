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
