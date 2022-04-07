export const loginStaff = /* GraphQL */ `
  mutation loginStaff($input: loginInput) {
    loginStaff(input: $input) {
      response
      token
    }
  }
`
