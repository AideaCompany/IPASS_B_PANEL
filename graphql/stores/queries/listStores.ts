export const listStores = /* GraphQL */ `
  query listStores {
    listStores {
      _id
      name
      address
      schedule {
        _id
        name
      }
<<<<<<< HEAD
=======
      services {
        _id
        plus
        name
        abbreviation
      }
>>>>>>> dev
    }
  }
`
