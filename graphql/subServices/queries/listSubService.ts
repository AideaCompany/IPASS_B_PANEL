export const listSubService = /* GraphQL */ `
  query listSubService($page: Int, $limit: Int, $filters: Any) {
    listSubService(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        plus
        name
        abbreviation
        products {
<<<<<<< HEAD
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
=======
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
>>>>>>> dev
        returnTime
        photo {
          filename
          key
        }
<<<<<<< HEAD
        stores
=======
        sex
        stores {
          _id
          name
          address
        }
>>>>>>> dev
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
