export const updateBrands = /* GraphQL */ `
  mutation updateBrands($input: updateBrandsInput) {
    updateBrands(input: $input) {
      _id
      name
      logo {
        filename
        key
      }
    }
  }
`
