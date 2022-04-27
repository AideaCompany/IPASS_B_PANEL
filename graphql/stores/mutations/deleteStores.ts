export const deleteStores = /* GraphQL */` 
 mutation deleteStores($input: deleteStoresInput){
    deleteStores(input: $input){
        _id
    }
}
`;
