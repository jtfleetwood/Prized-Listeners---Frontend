/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Dynamic routing used to display another user's profile to a user.
 * As you can see we are not displaying another user's email.
 * ****************************************************************************/

import HAccess from '../../components/HAccess';
import { useUser } from '@auth0/nextjs-auth0';
import { get_user_by_id } from '../../API Services/users';
import Footer from '../../components/Footer';
import { getAccessToken } from '@auth0/nextjs-auth0';
import {useEffect, useState} from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Profile = (props) => {

    const {user, isLoading} = useUser();

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

    // If user is logged in, and page is done loading.
    else {
        return (
            <>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <div className = "page-holder">
                    <HAccess current_page = "profile" user_id = {user.sub}/>
                    <div className = "profile-info-container">
                        <img className = "profile-picture" src={props.ext_user.picture}></img>
                        <div className = "profile-info-heading">Display Name:
                         <span className = "profile-info-content">{props.ext_user.nickname}</span>
                        </div>
                        <div className = "profile-info-heading">Ties:
                         <span className = "profile-info-content">{props.ext_user.app_metadata.tie_count}</span>
                        </div>
                        <div className = "profile-info-heading">Wins:
                         <span className = "profile-info-content">{props.ext_user.app_metadata.win_count}</span>
                        </div>
                    </div>
                    <div className = "footer-separate"></div>
                    <Footer/>
                </div>
            </>
        )

    }

        
}

/*
    Getting API url from env variables, getting user access token to make API calls,
    and getting current user object from backend. 

    Important: we are injecting the API_URL from environment variables as this is
    an internally used API only and no one else should have the link. It is 
    secured via JWT mechanisms, but an extra measure.
*/
export async function getServerSideProps(context) {

    try {
        const ALT_API_URL = process.env.API_URL;
        const response = await getAccessToken(context.req, context.res);
        const ACCESS_TOKEN = response.accessToken;
        const ext_user = await get_user_by_id(process.env.API_URL, context.params.user_id, ACCESS_TOKEN);
        return {props : {ALT_API_URL, ext_user}};

    }

    catch (error) {
        console.log(error);
        return {props : {}};
    }
}

// Securing web page.
const ProtectedProfile = withPageAuthRequired(Profile);
export default ProtectedProfile;

