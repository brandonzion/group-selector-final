import React from "react";
import { Auth } from 'aws-amplify';

const Compute = () => {
    function test(){
        alert('hello')
    }


    return (
        <div>
            <h1>Account Page</h1>
            <button onClick={()=> Auth.signOut()}>Log Out</button>
            
        </div>
    );
};
  
export default Compute;