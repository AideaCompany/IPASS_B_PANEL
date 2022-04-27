export const createBrands = /* GraphQL */ `
  mutation createBrands($input: BrandsInput) {
    createBrands(input: $input) {
      _id
      name
      logo {
        filename
        key
      }
    }
  }
`
