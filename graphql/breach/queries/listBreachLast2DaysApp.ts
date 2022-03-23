export const listBreachLast2DaysApp = /* GraphQL */ `
  query listBreachLast2DaysApp($page: Int, $limit: Int, $filters: Any) {
    listBreachLast2DaysApp(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        grade
        location {
          _id
          address
          name
          abbreviation
        }
        status
        worker {
          _id
          name
          lastname
          email
          verifyLogin
          active
          codeWorker
          phone
          tokenExpo
          document
          typeDocument
          QR
          canAccessToApp
          canAccessToWeb
          canUseAuthenticator
          banFinish
          code
          nativeLocation {
            name
          }
          createdAt
          updatedAt
        }
        contact {
          _id
          firstName
          lastName
          email
          phone
          nickname
          verified
          typeVerified
          banFinish
          createdAt
          updatedAt
          empresa
          DPI
        }
        user {
          _id
          name
          lastname
          email
          codeWorker
          active
          nativeLocation {
            name
          }
          country
          token
          verifyLogin
          createdAt
          tokenExpo
          updatedAt
          canCreateHost
          allEventWithAuth
          canAccessToApp
          canAccessToWeb
          document
          typeDocument
          code
          phone
          QR
          canUseAuthenticator
          banFinish
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
