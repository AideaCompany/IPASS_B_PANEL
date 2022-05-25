export const listStaff = /* GraphQL */ `
  query listStaff($page: Int, $limit: Int, $filters: Any) {
    listStaff(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        name
        name1
        name2
        lastName
        lastName1
        lastName2
        address
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
          sex
          returnTime
          createdAt
          updatedAt
        }
        stores {
          _id
          name
          address
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
