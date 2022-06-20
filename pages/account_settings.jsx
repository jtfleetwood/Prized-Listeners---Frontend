import HAccess from "../components/HAccess";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { change_user_display_name, reset_user_password } from "../API Services/users";
import Footer from "../components/Footer";


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

const AccountSettings = ({auth_url, auth_client_id, ALT_API_URL}) => {
    const {user, isLoading} = useUser();
    const [display_name, set_display_name] = useState('');
    const [v_display_name, set_v_display_name] = useState('');

    const on_name_reset = async (ALT_API_URL, user_id, new_name1, new_name2) => {
        try {
            if (new_name1 !== new_name2) {
                alert('Your provided display names did not match!');
                return;
            }
    
            else if (!new_name1 && !new_name2) {
                alert('Please provide a new display name in the fields!');
                return;
            }
    
    
            const response = await change_user_display_name(ALT_API_URL, user_id, new_name1);
    
            set_display_name('');
            set_v_display_name('');
    
            if (response.ok) {
                alert(`Display name successfully changed to: ${new_name1}! Note: this update may take up to a minute or so.`);
                return;
            }
    
            alert('Oops! An error occurred.. Please try to reset your display name again.');
        }
    
        catch (error) {
            console.log(error);
        }
    }

    if (!user) {
        return <div>You are not authorized to access this page!</div>
    }


    else if (user && !isLoading) {
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
                    
                    <Footer/>
                    
                </div>
            </>
        )

    }

    else {
        return <div>Loading!</div>
    }
    
}

export async function getServerSideProps() {
    const auth_url = process.env.AUTH0_ISSUER_BASE_URL;
    const auth_client_id = process.env.AUTH0_CLIENT_ID;
    const ALT_API_URL = process.env.API_URL;

    return {props : {auth_url, auth_client_id, ALT_API_URL}};
}

export default AccountSettings;