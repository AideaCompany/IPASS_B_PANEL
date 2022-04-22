export const createStyleHair = /* GraphQL */` 
 mutation createStyleHair($input: StyleHairInput){
    createStyleHair(input: $input){
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
