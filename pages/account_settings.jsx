/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Account settings page.
 * ****************************************************************************/

import HAccess from "../components/HAccess";
import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import { change_user_display_name, reset_user_password } from "../API Services/users";
import Footer from "../components/Footer";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// Called when user attempts to reset password. Making front-end Auth0 API call.
const on_password_submit = async (email, auth_url, auth_client_id) => {

    try {
        const response = await reset_user_password(email, auth_url, auth_client_id);

        if (response.ok) {
            alert('Password reset initiated via email! Please check your email to reset your password.');
            return;
        }

        alert('Oops! An error occured.. Please try to reset your password again.');
    }

    catch (error) {
        console.log(error);
    }
    
    
}

const AccountSettings = ({auth_url, auth_client_id, ALT_API_URL, ACCESS_TOKEN}) => {
    
    // Using hooks to get user input.
    const {user, isLoading} = useUser();
    const [display_name, set_display_name] = useState('');
    const [v_display_name, set_v_display_name] = useState('');

    // Called when user attempts to change their display name. 
    const on_name_reset = async (ALT_API_URL, user_id, new_name1, new_name2) => {

        try {
            
            // Data validation below.
            if (new_name1 !== new_name2) {
                alert('Your provided display names did not match!');
                return;
            }
    
            else if (!new_name1 && !new_name2) {
                alert('Please provide a new display name in the fields!');
                return;
            }
            
            // Making call to backend API which is integrated with Auth0 Management API.
            const response = await change_user_display_name(ALT_API_URL, user_id, new_name1, ACCESS_TOKEN);
    
            set_display_name('');
            set_v_display_name('');
            
            // If name succesfully changed..
            if (response.ok) {
                alert(`Display name successfully changed to: ${new_name1}! Note: this update may take up to a minute or so.`);
                return;
            }
            
            // If not.
            alert('Oops! An error occurred.. Please try to reset your display name again.');
        }
    
        catch (error) {
            console.log(error);
        }
    }

    const [loading, setLoading] = useState(false);

    // Smooth page loading animation.
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, []);

    // Check if page loading.
    if (loading || isLoading || !user) {

        return (
            <>
                <div class="center">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </>
        )
        
    }


    // If user signed in, and page done loading.
    else {
        return (
            <>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <div className = "page-holder">
                    <HAccess user_id={user.sub}/>
                    <div ></div>
                    <div className = "reset-name">Change Display Name: <input value = {display_name} onChange = {(e) => set_display_name(e.target.value)}className = "display-change-input"></input></div>
                    <div className = "reset-name">Verify Change: <input value = {v_display_name} onChange = {(e) => set_v_display_name(e.target.value)} className = "display-change-input"></input></div>
                    <div className = "submit-changes-container"> <button onClick = {() => on_name_reset(ALT_API_URL, user.sub, display_name, v_display_name)}className = "submit-changes-button" variant="dark">Submit Changes</button></div>
                    <div className = "reset-password-container">
                        <span className = "reset-password">Change Password: </span>
                        <button onClick = {() => on_password_submit(user.name, auth_url, auth_client_id)} className = "reset-password-button" variant="dark">Reset Password</button>
                    </div>
                    <div className = "footer-separate"></div>
                    <Footer/>
                    
                </div>
            </>
        )

    }

    
}

/*
    Getting API urls from environment variables so auth0 front-end API calls
    can be made. Also getting user access token.

    NOTE: This access token is generated once everytime a user is logged in.
*/
export async function getServerSideProps(context) {

    try {
        const auth_url = process.env.AUTH0_ISSUER_BASE_URL;
        const auth_client_id = process.env.AUTH0_CLIENT_ID;
        const ALT_API_URL = process.env.API_URL;

        const response = await getAccessToken(context.req, context.res);
        const ACCESS_TOKEN = response.accessToken;
        
        return {props : {auth_url, auth_client_id, ALT_API_URL, ACCESS_TOKEN}};
    }

    catch (error) {
        console.log(error);
        return {props:{}};
    }

}

// Securing web page.
const ProtectedAccountSettings = withPageAuthRequired(AccountSettings);
export default ProtectedAccountSettings;