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
=======
          productQuantity
        }
        eta
>>>>>>> dev
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
<<<<<<< HEAD
        stores
=======
>>>>>>> dev
        subService {
          _id
          plus
          name
          abbreviation
          eta
<<<<<<< HEAD
          staffers
          price
          cost
          subServiceFee
          taxes
          discounts
          subServiceTime
          returnTime
          stores
=======
          price
          cost
          serviceFee
          taxes
          discounts
          serviceTime
          returnTime
          sex
>>>>>>> dev
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
