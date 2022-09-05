import { Auth, Authenticator } from 'aws-amplify';
import React from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';


function signUp({ signOut, user }) {
    return (
      <div>
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
        </div>
    );
  }
  
  export default withAuthenticator(signUp);
  
