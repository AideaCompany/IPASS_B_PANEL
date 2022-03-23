export const listInvitationEventByEvent = /* GraphQL */ `
  query listInvitationEventByEvent($_id: String) {
    listInvitationEventByEvent(_id: $_id) {
      _id
      confirmed
      contact {
        _id
      }
      alreadySendInvitation
      isIn
      hourIn
      type
      expiration
      createdAt
      updatedAt
    }
  }
`
