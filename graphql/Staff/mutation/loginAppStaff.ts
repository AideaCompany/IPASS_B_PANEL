export const loginAppStaff = /* GraphQL */ `
  mutation loginAppStaff($input: loginInput) {
    loginAppStaff(input: $input) {
      response
      token
    }
  }
`
