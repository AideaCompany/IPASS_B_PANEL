export const deleteOccupation = /* GraphQL */` 
 mutation deleteOccupation($input: deleteOccupationInput){
    deleteOccupation(input: $input){
        _id
    }
}
`;
