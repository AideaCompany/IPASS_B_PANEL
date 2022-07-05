export const updateConfig = /* GraphQL */ `
  mutation updateConfig($input: configInput) {
    updateConfig(input: $input) {
      maxWaitTime
    }
  }
`
