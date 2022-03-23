export const updateInvitationEvent = /* GraphQL */ `
  mutation updateInvitationEvent($input: updateInvitationEventInput) {
    updateInvitationEvent(input: $input) {
      _id
      event {
        _id
        name
        start
        host {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
        end
        location {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        beforeStart
        onlyAuthUser
        createdAt
        updatedAt
        state
        deletedDate
        whoDeleted {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
      }
      contact {
        _id
        firstName
        lastName
        email
        phone
        nickname
        host {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
        verified
        typeVerified
        verifiedData {
          photo
          documentA
          documentB
          birthDate
          expirationDate
          sex
          lastName
          firstName
          nationality
          documentNumber
          correctionName
          correctionLastname
          correctionNumber
        }
        verifiedDataPDF {
          photo
          documentA
          documentB
          num1
          type
          name
          expedition
          expiration
          licNum
          num2
        }
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
        lastname
        email
        privilegeID {
          _id
          name
          createdAt
          updatedAt
        }
        active

        token
        verifyLogin
        createdAt
        updatedAt
      }
      location {
        _id
        masterLocation {
          _id
          name
          address
          onlyAllowAuthUSers
          createdAt
          updatedAt
          state
          deletedDate
        }
        childLocations {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        parentLocations {
          _id
          address
          name
          typeCheck
          createdAt
          updatedAt
          state
          deletedDate
        }
        address
        name
        admins {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
        host {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
        security {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
        typeCheck
        device {
          _id
          name
          type
          serialNumber
          status
          enableVideo
          enableTalk
          timeWait
        }
        createdAt
        updatedAt
        state
        deletedDate
        whoDeleted {
          _id
          name
          lastname
          email
          active

          token
          verifyLogin
          createdAt
          updatedAt
        }
      }
      expiration
      createdAt
      updatedAt
    }
  }
`
