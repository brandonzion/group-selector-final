import React from "react";
import { Auth } from 'aws-amplify';
import { Text } from '@aws-amplify/ui-react';


const StartPage = () => {
    function test(){
        alert('hello')
    }

    return (
        <div>
            <h1>Instructions</h1>

            <Text
            variation="primary"
            as="p"
            color="black"
            lineHeight="1.5em"
            fontWeight={400}
            fontSize="1em"
            fontStyle="normal"
            textDecoration="none"
            width="30vw"
            >
                1. If you are a new user, please sign up for an account<br/>
                2. Create a new Class <br/>
                3. Add students to the class<br/>
                4. Generate your groups!
            </Text>
            
        </div>
    );
};
  
export default StartPage;