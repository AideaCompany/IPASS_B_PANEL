export const updateStores = /* GraphQL */ `
  mutation updateStores($input: updateStoresInput) {
    updateStores(input: $input) {
      _id
      name
      address
      schedule {
        _id
        name
        start
        end
        days
        abbreviation
        createdAt
        updatedAt
      }
    }
  }
`
