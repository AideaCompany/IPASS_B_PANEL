export const firstLogin = /* GraphQL */ `
  query firstLogin {
    firstLogin
  }
`
export const getGallery = /* GraphQL */ `
  query getGallery($_id: inputId) {
    getGallery(_id: $_id) {
      _id
      filename
      url
      size
      resolution
      createdAt
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
      createdAt
      updatedAt
    }
  }
`
export const list = /* GraphQL */ `
  query list {
    list {
      _id
      name
      latlng
      translations {
        de
        es
        fr
        ja
        it
        br
        pt
        nl
        hr
        fa
      }
      nativeName
      createdAt
      updatedAt
    }
  }
`
export const listGallery = /* GraphQL */ `
  query listGallery {
    listGallery {
      _id
      filename
      url
      size
      resolution
      createdAt
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
      createdAt
      updatedAt
    }
  }
`
