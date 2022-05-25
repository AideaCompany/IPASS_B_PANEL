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
<<<<<<< HEAD
      lastname1
      lastname2
      lastname3
=======
      lastName1
      lastName2
      lastName3
>>>>>>> dev
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
<<<<<<< HEAD
=======
      country
>>>>>>> dev
      referrals
      servicesNotes
      productsNotes
      document
      medicalNotes
      socialMedia
    }
  }
`
