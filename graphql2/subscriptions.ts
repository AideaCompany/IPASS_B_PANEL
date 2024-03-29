export const invitationEventByEvent = /* GraphQL */ `
  subscription invitationEventByEvent($_id: String) {
    invitationEventByEvent(_id: $_id) {
      _id
      event {
        _id
        name
        start
        host {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            permissions {
              sectionID
              read
              create
              delete
              update
            }
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
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
            onlyAllowAuthUSers
            createdAt
            updatedAt
          }
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          admin {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        end
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
      createdAt
      updatedAt
    }
  }
`
export const listEventByLocationID = /* GraphQL */ `
  subscription listEventByLocationID($locationID: ID) {
    listEventByLocationID(locationID: $locationID) {
      _id
      name
      start
      host {
        _id
        name
        lastName
        email
        privilegeID {
          _id
          name
          permissions {
            sectionID
            read
            create
            delete
            update
          }
          createdAt
          updatedAt
        }
        active
        token
        masterLocation {
          _id
          name
          address
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          onlyAllowAuthUSers
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
        admin {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
            onlyAllowAuthUSers
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
          admin {
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
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        canCreateHost
        allEventWithAuth
        createdAt
        updatedAt
      }
      end
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
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
    }
  }
`
export const subAccess = /* GraphQL */ `
  subscription subAccess($contactID: ID) {
    subAccess(contactID: $contactID) {
      _id
      event {
        _id
        name
        start
        host {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            permissions {
              sectionID
              read
              create
              delete
              update
            }
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
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
            onlyAllowAuthUSers
            createdAt
            updatedAt
          }
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          admin {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        end
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
      createdAt
      updatedAt
    }
  }
`
export const subEvent = /* GraphQL */ `
  subscription subEvent($id: ID) {
    subEvent(id: $id) {
      _id
      name
      start
      host {
        _id
        name
        lastName
        email
        privilegeID {
          _id
          name
          permissions {
            sectionID
            read
            create
            delete
            update
          }
          createdAt
          updatedAt
        }
        active
        token
        masterLocation {
          _id
          name
          address
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          onlyAllowAuthUSers
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
        admin {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
            onlyAllowAuthUSers
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
          admin {
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
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        canCreateHost
        allEventWithAuth
        createdAt
        updatedAt
      }
      end
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
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
    }
  }
`
export const subListContact = /* GraphQL */ `
  subscription subListContact($contactID: ID) {
    subListContact(contactID: $contactID) {
      _id
      firstName
      lastName
      email
      phone
      nickname
      host {
        _id
        name
        lastName
        email
        privilegeID {
          _id
          name
          permissions {
            sectionID
            read
            create
            delete
            update
          }
          createdAt
          updatedAt
        }
        active
        token
        masterLocation {
          _id
          name
          address
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          onlyAllowAuthUSers
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
        admin {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
            onlyAllowAuthUSers
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
          admin {
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
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        canCreateHost
        allEventWithAuth
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
  }
`
export const subListEvent = /* GraphQL */ `
  subscription subListEvent {
    subListEvent {
      _id
      name
      start
      host {
        _id
        name
        lastName
        email
        privilegeID {
          _id
          name
          permissions {
            sectionID
            read
            create
            delete
            update
          }
          createdAt
          updatedAt
        }
        active
        token
        masterLocation {
          _id
          name
          address
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          onlyAllowAuthUSers
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
        admin {
          _id
          name
          lastName
          email
          privilegeID {
            _id
            name
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
            onlyAllowAuthUSers
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
          admin {
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
          canCreateHost
          allEventWithAuth
          createdAt
          updatedAt
        }
        canCreateHost
        allEventWithAuth
        createdAt
        updatedAt
      }
      end
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
      beforeStart
      onlyAuthUser
      createdAt
      updatedAt
    }
  }
`
export const subListLocation = /* GraphQL */ `
  subscription subListLocation {
    subListLocation {
      _id
      serialNumber
      masterLocation {
        _id
        name
        address
        location {
          _id
          serialNumber
          masterLocation {
            _id
            name
            address
            onlyAllowAuthUSers
            createdAt
            updatedAt
          }
          childLocations {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          parentLocations {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          address
          name
          timeWait
          enableVideo
          enableTalk
          admins {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          host {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          security {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          typeLocation
          createdAt
          updatedAt
        }
        onlyAllowAuthUSers
        createdAt
        updatedAt
      }
      childLocations {
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
      parentLocations {
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
      address
      name
      timeWait
      enableVideo
      enableTalk
      admins {
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
      security {
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
      operation
      typeLocation
      createdAt
      updatedAt
    }
  }
`
export const subListMasterLocation = /* GraphQL */ `
  subscription subListMasterLocation {
    subListMasterLocation {
      _id
      name
      address
      location {
        _id
        serialNumber
        masterLocation {
          _id
          name
          address
          location {
            _id
            serialNumber
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          onlyAllowAuthUSers
          createdAt
          updatedAt
        }
        address
        name
        timeWait
        enableVideo
        enableTalk
        typeLocation
        createdAt
        updatedAt
      }
      onlyAllowAuthUSers
      operation
      createdAt
      updatedAt
    }
  }
`
export const subLocationEntries = /* GraphQL */ `
  subscription subLocationEntries($locationID: String) {
    subLocationEntries(locationID: $locationID) {
      _id
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
          lastName
          email
          privilegeID {
            _id
            name
            permissions {
              sectionID
              read
              create
              delete
              update
            }
            createdAt
            updatedAt
          }
          active
          token
          masterLocation {
            _id
            name
            address
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
            onlyAllowAuthUSers
            createdAt
            updatedAt
          }
          location {
            _id
            serialNumber
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
              createdAt
              updatedAt
            }
            childLocations {
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
            parentLocations {
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
            address
            name
            timeWait
            enableVideo
            enableTalk
            admins {
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
            security {
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
            typeLocation
            createdAt
            updatedAt
          }
          admin {
            _id
            name
            lastName
            email
            privilegeID {
              _id
              name
              createdAt
              updatedAt
            }
            active
            token
            masterLocation {
              _id
              name
              address
              onlyAllowAuthUSers
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
            admin {
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
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
          }
          canCreateHost
          allEventWithAuth
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
      event {
        _id
        name
        start
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
        end
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
        beforeStart
        onlyAuthUser
        createdAt
        updatedAt
      }
      hourIn
    }
  }
`
