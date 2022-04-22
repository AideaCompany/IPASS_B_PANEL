export const listStyleHair = /* GraphQL */` 
 query listStyleHair{
    listStyleHair{
        _id
        name
        question
        text
        photo{
            filename
            key
        }
    }
}
`;
