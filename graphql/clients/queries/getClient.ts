export const getClient = /* GraphQL */ `
  query getClient($_id: String) {
    getClient(_id: $_id) {
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
      country
      referrals
      servicesNotes
      productsNotes
      document
      medicalNotes
      socialMedia
    }
  }
`
