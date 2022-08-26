import React from "react";
import {Amplify, API, Auth} from 'aws-amplify';
const Compute = () => {
    async function getData() { 
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

    async function computeGroups() {
        const response = await getData();
        var firstNames = response.firstNames
        var lastNames = response.lastNames
        var combined = []
        for(var i=0;i<firstNames.length;i++){
            combined.push(firstNames[i] + " " + lastNames[i])
        }
        const user = await Auth.currentAuthenticatedUser()
        const token = user.signInUserSession.idToken.jwtToken
        const requestData = {
            headers: {
                Authorization: token,
            },
            body:{"studentNames":combined, "numGroups":2}
        }
        console.log(requestData)
        const data = await API.post("generateGroupsAPI", "/generate", requestData);
        console.log(data["solution"])
    }

    (async function () {
        const response = await getData();
        var firstNames = response.firstNames
        var lastNames = response.lastNames
        var table = "" ;
            for(var i =0;i<firstNames.length;i++){
                table += "<tr>";
                table += "<td>" 
                        + firstNames[i] +"</td>" 
                        + "<td>" + lastNames[i] +"</td>" 
                table += "</tr>";
            }
        document.getElementById("studentsTable").innerHTML = table;
    })();

    return (
        <div>
            <h1>Students</h1>
            <table id="studentsTable"></table>
            <button onClick={computeGroups}>Generate Groups</button>
        </div>
    );
};
  
export default Compute;