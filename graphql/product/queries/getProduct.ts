export const getProduct = /* GraphQL */` 
 query getProduct($_id: ID!){
    getProduct(_id: $_id){
        _id
        name
        abbreviation
        brand{
            _id
            name
            logo{
                filename
                key
            }
        }
        photo{
            filename
            key
        }
        productType
        price
        measureType
        amount
        services{
            _id
            plus
            name
            abbreviation
            type{
                _id
                name
            }
            products{
                productQuantity
            }
            eta
            price
            cost
            serviceFee
            taxes
            discounts
            serviceTime
            sex
            returnTime
            photo{
                filename
                key
            }
            subService{
                _id
                plus
                name
                abbreviation
                eta
                price
                cost
                serviceFee
                taxes
                discounts
                serviceTime
                returnTime
                sex
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        designedFor
        createdAt
        updatedAt
    }
}
`;
