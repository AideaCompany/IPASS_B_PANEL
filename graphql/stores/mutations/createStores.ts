export const createStores = /* GraphQL */` 
 mutation createStores($input: StoresInput){
    createStores(input: $input){
        _id
        name
        address
        schedule{
            _id
            name
            start
            end
            days
            abbreviation
            createdAt
            updatedAt
        }
    }
}
`;
