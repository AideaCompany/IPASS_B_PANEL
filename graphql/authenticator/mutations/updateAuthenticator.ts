export const updateAuthenticator = /* GraphQL */ `
  mutation updateAuthenticator($input: updateAuthenticatorInput) {
    updateAuthenticator(input: $input) {
      _id
      app {
        _id
        name
        url
        clientID
        createdAt
        updatedAt
      }
      code
      status
      user {
        _id
        name
        lastName
        email
        active
        token
        canCreateHost
        allEventWithAuth
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
