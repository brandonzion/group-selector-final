import './App.css';
import React, { Component } from 'react';
import { Amplify, Auth, API, sectionFooterSecondaryContent } from 'aws-amplify';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { TextField } from '@aws-amplify/ui-react';
import { Grid, View, useTheme, FileUpload, Card, Button } from '@aws-amplify/ui-react';
import { 
  NewUpload 
} from './ui-components';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import AccountPage from './AccountPage'

import awsExports from './aws-exports';
Amplify.configure(awsExports);

class App extends Component{
  
  const { tokens } = useTheme();
  const [fileData, setFileData] = useState();
  var actionPage = "bruh"
  const uploadFile = async () => {
    var reader = new FileReader();
    reader.readAsText(fileData);
    reader.onload = async function(event) {

      var csv = event.target.result;
  
      var rows = csv.split('\n');
      var raw = {}
      raw['studentNames'] = []

      const user = await Auth.currentAuthenticatedUser()
      const username = user.username
  
      for (var i = 0; i < rows.length; i++) {
        var cols = rows[i].split(',');
        raw['studentNames'].push({firstName: cols[0], lastName:cols[1]})
      }
      console.log(raw)
      raw['username'] = username
      const token = user.signInUserSession.idToken.jwtToken
      console.log(token)
      console.log(raw)
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
      <Grid
        templateColumns="1fr 4fr"
        templateRows="20rem 30rem 20rem"
        gap={tokens.space.small}
      >
        <View rowSpan={2} backgroundColor={tokens.colors.orange[20]}>
          <Grid
            templateColumns="1fr"
            templateRows="5rem 5rem 5rem"
            gap={tokens.space.small}
          >
            SideBar
            <View backgroundColor={tokens.colors.orange[40]}>
              {/* Account Button */}
              <Button
                isFullWidth='true'
                height='5rem'
                fontSize='2rem'
                loadingText=""
                onClick={() => alert('hello')}
                ariaLabel=""
                >
                Account
              </Button>
              {/* Classes Button */}
            </View>
            <View backgroundColor={tokens.colors.orange[40]}>
              <Button
                isFullWidth='true'
                height='5rem'
                fontSize='2rem'
                loadingText=""
                onClick={() => }
                ariaLabel=""
                >
                Classes
              </Button>
            </View>
          </Grid>
        </View>
        <View backgroundColor={tokens.colors.orange[40]} id='actionScreen'>
          { actionPage } 
        </View>
        <View backgroundColor={tokens.colors.orange[60]}>Display</View>
      </Grid>
      <input type='file' accept='.csv' onChange={(e) => setFileData(e.target.files[0])}></input>
      <button onClick={uploadFile}>Submit</button>
      <button onClick={signOut}>Sign Out</button>
      
      <Outlet />
    </div>
  );
}

export default withAuthenticator(App);
