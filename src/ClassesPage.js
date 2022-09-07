import React from "react";
import { View, ScrollView, Button, TextField, Text, Alert } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { API, Auth } from 'aws-amplify';


const ClassesPage = () => {
    const [displayPage, setDisplayPage] = useState();
    const [classesButtons, setClassesButtons] = useState();
    var  createClassPage = <View>
        <TextField
            placeholder="History"
            label="Class Name"
            id='classNameInput'
        /> 
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={() => createClass()}
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
    
    
    async function createClass(){
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        const raw = {}
        if(document.getElementById("classNameInput").value.length == 0){
            document.getElementById("errorText").innerText = "Please provide a class name"
        }
        else{
            raw['className'] = document.getElementById("classNameInput").value
            raw['username'] = user.username
            const requestData = {
                headers: {
                Authorization: token,
                },
                body:raw
            }
            console.log(requestData)
            const data = await API.post("classesAPI", "/create", requestData);
            console.log(data)
            document.getElementById("errorText").variation = "success"
            document.getElementById("errorText").innerText = "Class Successfully Submitted"
        }
        displayClasses()
    }

    async function getClasses() { 
        const user = await Auth.currentAuthenticatedUser()
        console.log(user)
        const token = user.signInUserSession.idToken.jwtToken
        const username = user.username
        const requestData = {
            headers: {
                Authorization: token,
            },
            body:{"username": username}
        }
        const apiName = 'classesAPI'
        const path = '/get'
        return API.post(apiName, path, requestData)
    }

    async function displayClasses(){
        const response = await getClasses();
        var classes = response.classes
        console.log(classes)
        var classesString = ""
        for(var i =0;i<classes.length;i++){
            classesString = classesString + classes[i] + "\n"     
        }
        document.getElementById("classesText").innerText = classesString;
    };

    async function editClasses(){
        var tempClassesButtons = []
        const response = await getClasses();
        var classes = response.classes
        console.log(classes)
        var classesString = ""
        for(var i =0;i<classes.length;i++){
            await tempClassesButtons.push(<Button key={classes[i]} onClick={e => updateClass(e.target.innerText)}>{ classes[i] }</Button>)     
            console.log(tempClassesButtons)
        }
        
        setClassesButtons(tempClassesButtons)
    };

    async function updateClass(selectedClass){
        console.log(selectedClass)
    };

    displayClasses()
    

    return (
        <div>
            <h1>Classes Page</h1>
            <Button
                width="15rem"
                height='4rem'
                fontSize='1rem'
                loadingText=""
                onClick={() => setDisplayPage(createClassPage)}
                ariaLabel=""
                >
                Create New Class
            </Button>
            <Button
                width="15rem"
                height='4rem'
                fontSize='1rem'
                loadingText=""
                onClick={editClasses}
                ariaLabel=""
                >
                Edit Classes
            </Button>
            { displayPage }
            { classesButtons }
            
            <ScrollView width="400" height="300px">
                <Text
                    width="800px"
                    maxWidth="800px"
                    alt="Amplify-logo"
                    id='classesText'
                />
            </ScrollView>
            
        </div>
    );
};
  
export default ClassesPage;