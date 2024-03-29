export const listClient = /* GraphQL */ `
  query listClient($page: Int, $limit: Int, $filters: Any) {
    listClient(page: $page, limit: $limit, filters: $filters) {
      docs {
        _id
        plus
        photo {
          filename
          key
        }
        name1
        name2
        createdAt
        lastName1
        lastName2
        lastName3
        phone1
        phone2
        email
        privateAddress
        businessAddress
        occupation
        age
        sex
        ranking
        channel
        trm
        pt
        rom
        lastVisit
        referrals
        servicesNotes
        productsNotes
        document
        medicalNotes
        socialMedia
        country
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
