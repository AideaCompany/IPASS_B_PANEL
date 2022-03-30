export const signUpStaff = /* GraphQL */ `
  mutation signUpStaff($input: confirmSignUpInput) {
    signUpStaff(input: $input) {
      token
    }
  }
`
