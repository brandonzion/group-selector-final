import React from "react";
import { Grid, View, useTheme, FileUpload, Card, Button, TextField, Text, ScrollView } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { API, Auth } from 'aws-amplify';


const StudentsPage = () => {
    const [fileData, setFileData] = useState();    
    const [displayPage, setDisplayPage] = useState();

    var addStudentPage = <View>
        <TextField
            placeholder="John"
            label="First Name"
            id='firstNameInput'
        /> 
        <TextField
            placeholder="Doe"
            label="Last Name"
            id='lastNameInput'
        /> 
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={() => addStudent()}
            ariaLabel=""
            >
            Submit
        </Button>
        <Text
            variation="error"
            as="p"
            lineHeight="1.5em"
            fontWeight={400}
            fontSize="1em"
            fontStyle="normal"
            textDecoration="none"
            width="30vw"
            id='errorText'
        >
        </Text>
        
    </View>
    
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

    async function getStudents() { 
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        const username = user.username
        const requestData = {
            headers: {
                Authorization: token,
            },
            body:{"username": username}
        }
        const apiName = 'displayStudentsAPI'
        const path = '/display'
        return API.post(apiName, path, requestData)
    }


    const addStudent = async () => {
        const user = await Auth.currentAuthenticatedUser()
        const username = user.username
        if(document.getElementById("firstNameInput").value.length == 0 || document.getElementById("lastNameInput").value.length == 0){
            document.getElementById("errorText").innerText = "Please provide both the first and last name of the student"
        }
        else{
            var raw = {}
            raw['username'] = username
            raw['studentNames'] = [{firstName:document.getElementById("firstNameInput").value, lastName:document.getElementById("lastNameInput").value}]
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
            document.getElementById("errorText").variation = "success"
            document.getElementById("errorText").innerText = "Class Successfully Submitted"
            displayStudents()
            return data
        }
        
        
    }

    async function displayStudents() {
        const response = await getStudents();
        var firstNames = response.firstNames
        var lastNames = response.lastNames
        var studentList = "" ;
            for(var i =0;i<firstNames.length;i++){
                studentList = studentList + firstNames[i] + " " + lastNames[i] + "\n"
            }
        document.getElementById("studentsText").innerText = studentList;
    };
    displayStudents()

    return (
        <div>
            <h1>Students Page</h1>
            <input type='file' accept='.csv' onChange={(e) => setFileData(e.target.files[0])}></input>
            <button onClick={uploadFile}>Submit</button>
            <Button onClick={displayStudents}>Refresh Students</Button>
            <Button
                width="15rem"
                height='4rem'
                fontSize='1rem'
                loadingText=""
                onClick={() => setDisplayPage(addStudentPage)}
                ariaLabel=""
                >
                Add Student
            </Button>
            { displayPage }
            <ScrollView width="400" height="300px">
                <Text
                    width="800px"
                    maxWidth="800px"
                    alt="Amplify-logo"
                    id='studentsText'
                />
            </ScrollView>
        </div>
    );
};
  
export default StudentsPage;