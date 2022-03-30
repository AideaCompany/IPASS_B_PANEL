export const createMassiveClient = /* GraphQL */` 
 mutation createMassiveClient($input: [ClientInput]){
    createMassiveClient(input: $input){
        email
        success
        reason
    }
}
`;
