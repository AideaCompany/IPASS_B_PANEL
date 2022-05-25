export const getSubService = /* GraphQL */` 
 query getSubService($_id: String){
    getSubService(_id: $_id){
        _id
        plus
        name
        abbreviation
        products{
            product{
                _id
                name
                abbreviation
                productType
                price
                measureType
                amount
                designedFor
                createdAt
                updatedAt
            }
            productQuantity
        }
        type{
            _id
            name
            logo{
                filename
                key
            }
        }
        eta
        staffers{
            _id
            name
            name1
            name2
            lastName
            lastName1
            lastName2
            address
            stores{
                _id
                name
                address
            }
            phone
            phone1
            photo{
                filename
                key
            }
            email
            specialty
            AET
            canAccessToApp
            canAccessToWeb
            client
            active
            tokenExpo
            plus
            verifyLogin
            services{
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
                sex
                returnTime
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        price
        cost
        serviceFee
        taxes
        discounts
        serviceTime
        returnTime
        photo{
            filename
            key
        }
        sex
        stores{
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
            services{
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
                sex
                returnTime
                createdAt
                updatedAt
            }
        }
        createdAt
        updatedAt
    }
}
`;
