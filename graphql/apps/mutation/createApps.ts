export const createApps = /* GraphQL */` 
 mutation createApps($input: AppsInput){
    createApps(input: $input){
        _id
        name
        url
        clientID
        createdAt
        updatedAt
    }
}
`;
