/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Dynamic route to display profile information to a specific user.
 * ****************************************************************************/

import HAccess from '../../../components/HAccess';
import { useUser } from '@auth0/nextjs-auth0';
import {get_user_by_id} from '../../../API Services/users';
import Footer from '../../../components/Footer';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react';

const SelfProfile = (props) => {
    
    const {user} = useUser();
    const [loading, setLoading] = useState(false);

    // Smooth page loading animation.
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, []);

    // Check if page loading.
    if (loading) {

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

    // If page is done loading and user is signed in.
    else if (user) {
       
        return (
            <>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </head>
                <div className = "page-holder">
                    <HAccess current_page = "profile-self" user_id = {user.sub}/>
                    <div className = "profile-info-container">
                    <img className = "profile-picture" src={user.picture}></img>
                        <div className = "profile-info-heading">Email:
                         <span className = "profile-info-content">{user.name}</span>
                        </div>
                        <div className = "profile-info-heading">Display Name:
                         <span className = "profile-info-content">{user.nickname}</span>
                        </div>
                        <div className = "profile-info-heading">Ties:
                         <span className = "profile-info-content">{props.ext_user.app_metadata.tie_count}</span>
                        </div>
                        <div className = "profile-info-heading">Wins:
                         <span className = "profile-info-content">{props.ext_user.app_metadata.win_count}</span>
                        </div>
                </div>
                    <Footer/>
                </div>
            </>
        )

    }

    // Invalid attempt to load page.
    else {
        return <div>You are not authorized to view this page!</div>
    }
        
}

/*
    Getting API url from env variables, getting user access token to make API calls,
    and getting current user object from backend.
*/
export async function getServerSideProps(context) {

    try {
        const ALT_API_URL = process.env.API_URL;
        const response = await getAccessToken(context.req, context.res);
        const ACCESS_TOKEN = response.accessToken;

        const ext_user = await get_user_by_id(ALT_API_URL, context.params.user_id, ACCESS_TOKEN);
    
        return {props : {ALT_API_URL, ext_user}};
    }

    catch (error) {
        console.log(error);
    }
}


export default SelfProfile;