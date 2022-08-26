import './App.css';
import React from "react";
import { Amplify, Auth, API } from 'aws-amplify';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [fileData, setFileData] = useState();

  const uploadFile = async () => {
    var reader = new FileReader();
    reader.readAsText(fileData);
    reader.onload = async function(event) {

      var csv = event.target.result;
  
      var rows = csv.split('\n');
      var raw = {}

      const user = await Auth.currentAuthenticatedUser()
      const username = user.username
  
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].split(',');
        raw[i.toString()] = {firstName: cols[0], lastName:cols[1]}
      }
      console.log(raw)
      raw['username'] = username
      const token = user.signInUserSession.idToken.jwtToken
      console.log(token)
      console.log({raw})
      const requestData = {
        headers: {
          Authorization: token,
        },
        body:raw
      }
      const data = await API.post("uploadFileAPIFinal", "/upload", requestData);
      console.log({data})
      return data
    }
  }
  

  
  return (
    <div>
      <h1>Hello {user.username}</h1>
      <input type='file' accept='.csv' onChange={(e) => setFileData(e.target.files[0])}></input>
      <button onClick={uploadFile}>Submit</button>
      <button onClick={signOut}>Sign Out</button>
      <Link to="/compute">Compute</Link> |{" "}
      <Outlet />
    </div>
  );
}

export default withAuthenticator(App);
