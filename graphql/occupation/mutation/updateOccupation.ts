export const updateOccupation = /* GraphQL */` 
 mutation updateOccupation($input: updateOccupationInput){
    updateOccupation(input: $input){
        _id
        name
        createdAt
        updatedAt
    }
}
`;
