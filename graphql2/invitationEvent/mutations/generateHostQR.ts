export const generateHostQR = /* GraphQL */ `
  mutation generateHostQR($location: String) {
    generateHostQR(location: $location) {
      _id
      event {
        _id
        name
        start
        end
        beforeStart
        onlyAuthUser
        createdAt
        updatedAt
      }
      contact {
        _id
        firstName
        lastName
        email
        phone
        nickname
        verified
        typeVerified
        createdAt
        updatedAt
      }
      confirmed
      alreadySendInvitation
      isIn
      hourIn
      type
      host {
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
      location {
        _id
        serialNumber
        address
        name
        timeWait
        enableVideo
        enableTalk
        typeLocation
        createdAt
        updatedAt
      }
      expiration
      createdAt
      updatedAt
    }
  }
`
