import React from "react";
import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { View, TextField, Button, Text } from '@aws-amplify/ui-react';


const AccountPage = () => {
    const [accountScreen, setAccountScreen] = useState();
    const [inputScreen, setInputScreen] = useState();
    const[verificationInput, setVerificationInput] = useState();
    var Username;
    
    const baseUI = <View>
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={() => setInputScreen(loginUI)}
            >
            Log In
        </Button>
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={() => setInputScreen(signUpUI)}
            >
            Sign Up
        </Button>
    </View>

    const loginUI = <View>
        <TextField
            label="Username"
            id='usernameInput'
        /> 
        <TextField
            type="password"
            label="Password"
            id='passwordInput'
        /> 
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={onSignIn}
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
    
    const signUpUI = <View>
        <TextField
            label="Username"
            id='usernameSignUpInput'
        /> 
        <TextField
            type="password"
            label="Password"
            id='passwordSignUpInput'
        /> 
        <TextField
            type="email"
            label="Email"
            id='emailSignUpInput'
        /> 
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={onSignUp}
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
            id='signUperrorText'
        >
        </Text>
    </View>

    const logoutUI = <View>
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={onSignOut}
            ariaLabel=""
            >
            Log Out
        </Button>
    </View>

    const verificationUI = <View>
        <TextField
            type="number"
            label="Verification Code"
            id='verificationCodeInput'
        /> 
        <Button
            height='5rem'
            fontSize='2rem'
            loadingText=""
            onClick={onVerificationCode}
            >
            Submit
        </Button>
    </View>

    async function onSignIn(){
        console.log(document.getElementById("usernameInput").value)
        try {
            const user = await Auth.signIn(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value);
            setAccountScreen(logoutUI)
            setInputScreen()
        } catch (error) {
            document.getElementById("errorText").innerText = error
            console.log('error signing in', error);
        }
    }

    async function onVerificationCode(){
        try {
            await Auth.confirmSignUp(Username, document.getElementById("verificationCodeInput").value);
            setAccountScreen(logoutUI)
            setVerificationInput()
          } catch (error) {
              console.log('error confirming sign up', error);
          }
    }

    async function onSignUp(){
        var username = document.getElementById("usernameSignUpInput").value
        Username = username
        var password = document.getElementById("passwordSignUpInput").value
        var email = document.getElementById("emailSignUpInput").value

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,          // optional
                },
                autoSignIn: { // optional - enables auto sign in after user is confirmed
                    enabled: true,
                }
            });
            console.log(user);
            setInputScreen()
            setVerificationInput(verificationUI)
        } catch (error) {
            console.log('error signing up:', error);
        }
    }

    async function onSignOut(){
        await Auth.signOut()
        setAccountScreen(baseUI)
    }

    async function showPage(){
        try {
            await Auth.currentAuthenticatedUser();
            setAccountScreen(logoutUI)
        } catch {
            setAccountScreen(baseUI)
        }
    }
    useEffect(() => {
        showPage()
    }, []);

    return (
        <div>
            <h1>Account Page</h1>
            { accountScreen }
            { inputScreen }
            { verificationInput }
        </div>
    );
    
};
  
export default AccountPage;