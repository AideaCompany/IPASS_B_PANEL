export const createAuthenticator = /* GraphQL */` 
 mutation createAuthenticator($input: AuthenticatorInput){
    createAuthenticator(input: $input){
        _id
        app{
            _id
            name
            url
            clientID
            createdAt
            updatedAt
        }
        code
        status
        user{
            _id
            name
            lastname
            email
            active
            token
            canCreateHost
            allEventWithAuth
            createdAt
            updatedAt
        }
        createdAt
        updatedAt
    }
}
`;
