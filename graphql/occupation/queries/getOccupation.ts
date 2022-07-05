export const getOccupation = /* GraphQL */` 
 query getOccupation($_id: String){
    getOccupation(_id: $_id){
        _id
        name
        createdAt
        updatedAt
    }
}
`;
