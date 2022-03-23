export const filterLocationEntries = /* GraphQL */ `
  query filterLocationEntries($filter: filter) {
    filterLocationEntries(filter: $filter) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
export const firstLogin = /* GraphQL */ `
  query firstLogin {
    firstLogin
  }
`
export const generateReportLocationEntries = /* GraphQL */ `
  query generateReportLocationEntries($filter: filter) {
    generateReportLocationEntries(filter: $filter)
  }
`
export const getContact = /* GraphQL */ `
  query getContact($_id: String) {
    getContact(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
            lastname
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
export const getEvent = /* GraphQL */ `
  query getEvent($_id: String) {
    getEvent(_id: $_id) {
      _id
      name
      start
      host {
        _id
        name
        lastname
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
              lastname
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
              lastname
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
              lastname
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
            lastname
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
export const getInvitationEvent = /* GraphQL */ `
  query getInvitationEvent($_id: String) {
    getInvitationEvent(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
export const getLocation = /* GraphQL */ `
  query getLocation($_id: String) {
    getLocation(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
        lastname
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
        lastname
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
        lastname
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
  }
`
export const getLocationBySerialNumber = /* GraphQL */ `
  query getLocationBySerialNumber($serialNumber: String) {
    getLocationBySerialNumber(serialNumber: $serialNumber) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
        lastname
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
        lastname
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
        lastname
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
  }
`
export const getLocationEntriesByLocation = /* GraphQL */ `
  query getLocationEntriesByLocation($locationID: String) {
    getLocationEntriesByLocation(locationID: $locationID) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
export const getLocationSecurity = /* GraphQL */ `
  query getLocationSecurity {
    getLocationSecurity {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
        lastname
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
        lastname
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
        lastname
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
  }
`
export const getMasterLocation = /* GraphQL */ `
  query getMasterLocation($_id: String) {
    getMasterLocation(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
      createdAt
      updatedAt
    }
  }
`
export const getPrivilege = /* GraphQL */ `
  query getPrivilege($_id: String) {
    getPrivilege(_id: $_id) {
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
  }
`
export const getSection = /* GraphQL */ `
  query getSection($_id: String) {
    getSection(_id: $_id) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`
export const getUser = /* GraphQL */ `
  query getUser($_id: String) {
    getUser(_id: $_id) {
      _id
      name
      lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
  }
`
export const getUserHost = /* GraphQL */ `
  query getUserHost {
    getUserHost {
      _id
      name
      lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
  }
`
export const getUsersAdmin = /* GraphQL */ `
  query getUsersAdmin {
    getUsersAdmin {
      _id
      name
      lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
  }
`
export const getUsersSecurity = /* GraphQL */ `
  query getUsersSecurity {
    getUsersSecurity {
      user {
        _id
        name
        lastname
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
              lastname
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
              lastname
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
              lastname
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
            lastname
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
      hasLocation
    }
  }
`
export const listContact = /* GraphQL */ `
  query listContact {
    listContact {
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
              lastname
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
              lastname
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
              lastname
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
            lastname
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
export const listEvent = /* GraphQL */ `
  query listEvent {
    listEvent {
      _id
      name
      start
      host {
        _id
        name
        lastname
        email
        admin {
          _id
          name
          lastname
          active
          token
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
            lastname
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
export const listInvitationEvent = /* GraphQL */ `
  query listInvitationEvent {
    listInvitationEvent {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
export const listInvitationEventByEvent = /* GraphQL */ `
  query listInvitationEventByEvent($_id: String) {
    listInvitationEventByEvent(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
export const listLocation = /* GraphQL */ `
  query listLocation {
    listLocation {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
        lastname
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
        lastname
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
        lastname
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
  }
`
export const listMasterLocation = /* GraphQL */ `
  query listMasterLocation {
    listMasterLocation {
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
              lastname
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
              lastname
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
              lastname
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
      createdAt
      updatedAt
    }
  }
`
export const listPrivilege = /* GraphQL */ `
  query listPrivilege {
    listPrivilege {
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
  }
`
export const listSection = /* GraphQL */ `
  query listSection {
    listSection {
      _id
      name
      createdAt
      updatedAt
    }
  }
`

export const listUser = /* GraphQL */ `
  query listUser {
    listUser {
      _id
      name
      lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
  }
`
export const getEventContact = /* GraphQL */ `
  query getEventContact($_id: ID) {
    getEventContact(_id: $_id) {
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
              lastname
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
              lastname
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
              lastname
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
              lastname
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
          lastname
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
