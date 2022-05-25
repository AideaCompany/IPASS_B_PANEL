export const listServiceSchedule = /* GraphQL */ `
  query listServiceSchedule($page: Int, $limit: Int, $filters: Any) {
    listServiceSchedule(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        service {
          _id
          plus
          name
        }
        staffer {
          _id
          name
          name1
          lastName
        }
        hour
        day
        store {
          _id
          name
          address
        }
        client {
          _id
          plus
          name1
          lastName1
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
