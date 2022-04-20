export const updateStyleHair = /* GraphQL */` 
 mutation updateStyleHair($input: updateStyleHairInput){
    updateStyleHair(input: $input){
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
