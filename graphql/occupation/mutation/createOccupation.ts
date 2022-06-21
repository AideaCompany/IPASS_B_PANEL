export const createOccupation = /* GraphQL */` 
 mutation createOccupation($input: OccupationInput){
    createOccupation(input: $input){
        _id
        name
        createdAt
        updatedAt
    }
}
`;
