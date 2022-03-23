export const createTimeZone = /* GraphQL */ `
  mutation createTimeZone($input: TimeZoneInput) {
    createTimeZone(input: $input) {
      _id
      name
      start
      end
      createdAt
      updatedAt
    }
  }
`
