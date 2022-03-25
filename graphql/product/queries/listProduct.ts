export const listProduct = /* GraphQL */` 
 query listProduct{
    listProduct{
        _id
        name
        abbreviation
        brand
        photo{
            filename
            key
        }
        productType
        price
        measureType
        amount
        services
        designedFor
    }
}
`;
