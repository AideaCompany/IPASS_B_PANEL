export const createMassiveStaff = /* GraphQL */ `
  mutation createMassiveStaff($input: [StaffInput]) {
    createMassiveStaff(input: $input) {
      email
      success
      reason
    }
  }
`
