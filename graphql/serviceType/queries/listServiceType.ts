<<<<<<< HEAD
export const listServiceType = /* GraphQL */` 
 query listServiceType{
    listServiceType{
        _id
        name
    }
}
`;
=======
export const listServiceType = /* GraphQL */ `
  query listServiceType {
    listServiceType {
      _id
      name
      logo {
        filename
        key
      }
    }
  }
`
>>>>>>> dev
