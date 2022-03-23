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
export const createFirstUser = /* GraphQL */ `
  mutation createFirstUser($input: userInput) {
    createFirstUser(input: $input) {
      token
    }
  }
`
export const createGallery = /* GraphQL */ `
  mutation createGallery($input: [GalleryInput]) {
    createGallery(input: $input) {
      _id
      filename
      url
      size
      resolution
      createdAt
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
      createdAt
      updatedAt
    }
  }
`
export const deleteGallery = /* GraphQL */ `
  mutation deleteGallery($input: inputId) {
    deleteGallery(input: $input) {
      _id
    }
  }
`
export const deleteGalleryAll = /* GraphQL */ `
  mutation deleteGalleryAll {
    deleteGalleryAll {
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
      createdAt
      updatedAt
    }
  }
`
export const forgotPassword = /* GraphQL */ `
  mutation forgotPassword($input: forgotPassword) {
    forgotPassword(input: $input) {
      response
      token
    }
  }
`
export const login = /* GraphQL */ `
  mutation login($input: loginInput) {
    login(input: $input) {
      response
      token
    }
  }
`
export const updateGallery = /* GraphQL */ `
  mutation updateGallery($input: updateGalleryInput) {
    updateGallery(input: $input) {
      _id
      filename
      url
      size
      resolution
      createdAt
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
      createdAt
      updatedAt
    }
  }
`
