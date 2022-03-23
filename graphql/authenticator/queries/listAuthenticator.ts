export const listAuthenticator = /* GraphQL */ `
  query listAuthenticator($page: Int, $limit: Int, $filters: Any) {
    listAuthenticator(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        app {
          _id
          name
          url
          clientID
          createdAt
          updatedAt
        }
        code
        status
        worker {
          _id
          name
          lastname
          email
          verifyLogin
          active
          phone
          document
          typeDocument
          QR
          canAccessToApp
          canAccessToWeb
          canUseAuthenticator
          banFinish
          code
          createdAt
          updatedAt
        }
        user {
          _id
          name
          lastname
          email
          active
          country
          token
          verifyLogin
          createdAt
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
        used
        entries {
          hourIn
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
