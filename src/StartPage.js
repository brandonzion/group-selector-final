import React from "react";
import { Auth } from 'aws-amplify';
import { Text } from '@aws-amplify/ui-react';


const Compute = () => {
    function test(){
        alert('hello')
    }

    return (
        <div>
            <h1>Account Page</h1>

            <Text
            variation="primary"
            as="p"
            color="blue"
            lineHeight="1.5em"
            fontWeight={400}
            fontSize="1em"
            fontStyle="normal"
            textDecoration="none"
            width="30vw"
            >
                Hello World!
                This is a text
            </Text>
            
        </div>
    );
};
  
export default Compute;