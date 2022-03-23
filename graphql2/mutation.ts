export const changePassword = /* GraphQL */ `
  mutation changePassword($input: confirmSignUpInput) {
    changePassword(input: $input) {
      token
    }
  }
`
export const confirmLogin = /* GraphQL */ `
  mutation confirmLogin($input: confirmUser) {
    confirmLogin(input: $input) {
      token
    }
  }
`
export const confirmSignUp = /* GraphQL */ `
  mutation confirmSignUp($input: confirmSignUpInput) {
    confirmSignUp(input: $input) {
      token
    }
  }
`
export const confirmUser = /* GraphQL */ `
  mutation confirmUser($input: confirmUser) {
    confirmUser(input: $input) {
      token
    }
  }
`
export const createContact = /* GraphQL */ `
  mutation createContact($input: ContactInput) {
    createContact(input: $input) {
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
export const createDummyData = /* GraphQL */ `
  mutation createDummyData($count: Int) {
    createDummyData(count: $count)
  }
`
export const createEvent = /* GraphQL */ `
  mutation createEvent($input: EventInput) {
    createEvent(input: $input) {
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
export const createFirstUser = /* GraphQL */ `
  mutation createFirstUser($input: userInput) {
    createFirstUser(input: $input) {
      token
    }
  }
`
export const createInvitationEvent = /* GraphQL */ `
  mutation createInvitationEvent($input: InvitationEventInput) {
    createInvitationEvent(input: $input) {
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
export const createLocation = /* GraphQL */ `
  mutation createLocation($input: LocationInput) {
    createLocation(input: $input) {
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
export const createMasterLocation = /* GraphQL */ `
  mutation createMasterLocation($input: MasterLocationInput) {
    createMasterLocation(input: $input) {
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
export const createPrivilege = /* GraphQL */ `
  mutation createPrivilege($input: privilegeInput) {
    createPrivilege(input: $input) {
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
export const createSection = /* GraphQL */ `
  mutation createSection($input: sectionInput) {
    createSection(input: $input) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`
export const createUser = /* GraphQL */ `
  mutation createUser($input: userInput) {
    createUser(input: $input) {
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
export const deleteContact = /* GraphQL */ `
  mutation deleteContact($input: deleteContactInput) {
    deleteContact(input: $input) {
      _id
    }
  }
`
export const deleteContactAll = /* GraphQL */ `
  mutation deleteContactAll($input: deleteContactInput) {
    deleteContactAll(input: $input) {
      _id
    }
  }
`
export const deleteEvent = /* GraphQL */ `
  mutation deleteEvent($input: deleteEventInput) {
    deleteEvent(input: $input) {
      _id
    }
  }
`
export const deleteEventAll = /* GraphQL */ `
  mutation deleteEventAll($input: deleteEventInput) {
    deleteEventAll(input: $input) {
      _id
    }
  }
`
export const deleteInvitationEvent = /* GraphQL */ `
  mutation deleteInvitationEvent($input: deleteInvitationEventInput) {
    deleteInvitationEvent(input: $input) {
      _id
    }
  }
`
export const deleteInvitationEventAll = /* GraphQL */ `
  mutation deleteInvitationEventAll($input: deleteInvitationEventInput) {
    deleteInvitationEventAll(input: $input) {
      _id
    }
  }
`
export const deleteLocation = /* GraphQL */ `
  mutation deleteLocation($input: deleteLocationInput) {
    deleteLocation(input: $input) {
      _id
    }
  }
`
export const deleteLocationAll = /* GraphQL */ `
  mutation deleteLocationAll($input: deleteLocationInput) {
    deleteLocationAll(input: $input) {
      _id
    }
  }
`
export const deleteMasterLocation = /* GraphQL */ `
  mutation deleteMasterLocation($input: deleteMasterLocationInput) {
    deleteMasterLocation(input: $input) {
      _id
    }
  }
`
export const deleteMasterLocationAll = /* GraphQL */ `
  mutation deleteMasterLocationAll($input: deleteMasterLocationInput) {
    deleteMasterLocationAll(input: $input) {
      _id
    }
  }
`
export const deletePrivilege = /* GraphQL */ `
  mutation deletePrivilege($input: deletePrivilegeInput) {
    deletePrivilege(input: $input) {
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
export const deletePrivilegeAll = /* GraphQL */ `
  mutation deletePrivilegeAll($input: deletePrivilegeInput) {
    deletePrivilegeAll(input: $input) {
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
export const deleteSection = /* GraphQL */ `
  mutation deleteSection($input: deleteSectionInput) {
    deleteSection(input: $input) {
      _id
    }
  }
`
export const deleteSectionAll = /* GraphQL */ `
  mutation deleteSectionAll($input: deleteSectionInput) {
    deleteSectionAll(input: $input) {
      _id
    }
  }
`
export const deleteUser = /* GraphQL */ `
  mutation deleteUser($input: deleteUserInput) {
    deleteUser(input: $input) {
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
export const eventacceptReject = /* GraphQL */ `
  mutation eventacceptReject($input: AcceptRejectEventInput) {
    eventacceptReject(input: $input) {
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
export const forgotPassword = /* GraphQL */ `
  mutation forgotPassword($input: forgotPassword) {
    forgotPassword(input: $input) {
      response
    }
  }
`
export const login = /* GraphQL */ `
  mutation login($input: loginInput) {
    login(input: $input) {
      response
    }
  }
`
export const sendDataVerification = /* GraphQL */ `
  mutation sendDataVerification($input: verifiedDataInput, $ID: String) {
    sendDataVerification(input: $input, ID: $ID) {
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
export const sendDataVerificationPDF = /* GraphQL */ `
  mutation sendDataVerificationPDF($input: verifiedDataInputPDF, $ID: String) {
    sendDataVerificationPDF(input: $input, ID: $ID) {
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
export const sendVerification = /* GraphQL */ `
  mutation sendVerification($contactID: ID) {
    sendVerification(contactID: $contactID) {
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
export const updateContact = /* GraphQL */ `
  mutation updateContact($input: updateContactInput) {
    updateContact(input: $input) {
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
export const updateEvent = /* GraphQL */ `
  mutation updateEvent($input: updateEventInput) {
    updateEvent(input: $input) {
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
export const updateLocation = /* GraphQL */ `
  mutation updateLocation($input: updateLocationInput) {
    updateLocation(input: $input) {
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
export const updateMasterLocation = /* GraphQL */ `
  mutation updateMasterLocation($input: updateMasterLocationInput) {
    updateMasterLocation(input: $input) {
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
export const updatePrivilege = /* GraphQL */ `
  mutation updatePrivilege($input: updatePrivilegeInput) {
    updatePrivilege(input: $input) {
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
export const updateSection = /* GraphQL */ `
  mutation updateSection($input: updateSectionInput) {
    updateSection(input: $input) {
      _id
      name
      createdAt
      updatedAt
    }
  }
`
export const updateUser = /* GraphQL */ `
  mutation updateUser($input: updateUserInput) {
    updateUser(input: $input) {
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
export const uploadMRZ = /* GraphQL */ `
  mutation uploadMRZ($input: GetPhoto) {
    uploadMRZ(input: $input) {
      birthDate
      expirationDate
      sex
      firstName
      lastName
      nationality
      documentNumber
    }
  }
`
export const uploadPDF = /* GraphQL */ `
  mutation uploadPDF($input: GetPhoto) {
    uploadPDF(input: $input) {
      num1
      type
      name
      expedition
      expiration
      licNum
      num2
    }
  }
`
export const verifyContact = /* GraphQL */ `
  mutation verifyContact($contactID: ID) {
    verifyContact(contactID: $contactID) {
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
export const verifyInputQR = /* GraphQL */ `
  mutation verifyInputQR($input: verifyInput) {
    verifyInputQR(input: $input) {
      ok
      msg
    }
  }
`
export const verifyPhoto = /* GraphQL */ `
  mutation verifyPhoto($input: GetPhoto) {
    verifyPhoto(input: $input)
  }
`

export const uploadPass = /* GraphQL */ `
  mutation uploadPass($input: GetPhoto) {
    uploadPass(input: $input) {
      birthDate
      expirationDate
      sex
      firstName
      lastName
      nationality
      documentNumber
    }
  }
`
