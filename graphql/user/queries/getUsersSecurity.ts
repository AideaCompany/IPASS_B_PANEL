export const getUsersSecurity = /* GraphQL */` 
 query getUsersSecurity{
    getUsersSecurity{
        _id
        name
        lastname
        email
        privilegeID{
            _id
            name
            permissions{
                sectionID
                read
                create
                delete
                update
            }
            createdAt
            updatedAt
        }
        active
        country
        token
        verifyLogin
        createdAt
        updatedAt
        canCreateHost
        allEventWithAuth
        canAccessToApp
        canAccessToWeb
        document
        typeDocument
        code
        phone
        QR
        group{
            _id
            name
            location{
                _id
                address
                name
                typeCheck
                createdAt
                updatedAt
                state
                abbreviation
                deletedDate
            }
            exists
            abbreviation
        }
        nativeLocation{
            _id
            masterLocation{
                _id
                name
                address
                onlyAllowAuthUSers
                tree
                createdAt
                updatedAt
                state
                deletedDate
            }
            childLocations{
                _id
                address
                name
                typeCheck
                createdAt
                updatedAt
                state
                abbreviation
                deletedDate
            }
            parentLocations{
                _id
                address
                name
                typeCheck
                createdAt
                updatedAt
                state
                abbreviation
                deletedDate
            }
            address
            name
            admins{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
                canUseAuthenticator
                banFinish
            }
            host{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
                canUseAuthenticator
                banFinish
            }
            security{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
                canUseAuthenticator
                banFinish
            }
            typeCheck
            device{
                _id
                name
                type
                serialNumber
                status
                exists
                enableVideo
                enableTalk
                timeWait
            }
            createdAt
            updatedAt
            state
            abbreviation
            deletedDate
            whoDeleted{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
                canUseAuthenticator
                banFinish
            }
        }
        canUseAuthenticator
        timeZone{
            _id
            name
            start
            end
            days
            abbreviation
            createdAt
            updatedAt
        }
        banFinish
    }
}
`;
