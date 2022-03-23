export const listWorker = /* GraphQL */ `
  query listWorker($page: Int, $limit: Int, $filters: Any) {
    listWorker(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        name
        name1
        name2
        lastname1
        lastname2
        codeWorker
        photo {
          filename
          key
        }
        lastname
        email
        code
        verifyLogin
        active
        phone
        document
        typeDocument
        QR
        apps {
          _id
          name
          url
          abbreviation
          clientID
          createdAt
          updatedAt
        }
        timeZone {
          _id
          name
          start
          end
          abbreviation
          createdAt
          updatedAt
        }
        temporal_Qr {
          QR
          worker
          timeEnd
          used
          valid
        }
        canAccessToApp
        canAccessToWeb
        group {
          _id
          name
          exists
          abbreviation
        }
        nativeLocation {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          abbreviation
          deletedDate
        }
        canUseAuthenticator
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
