/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Leaderboards page.
 * ****************************************************************************/

import { get_users } from "../API Services/users"
import HAccess from "../components/HAccess";
import UserStanding from "../components/UserStanding";
import Footer from "../components/Footer";
import { useUser } from "@auth0/nextjs-auth0";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

// Method that takes in array of users and creates a leaderboard object (2D array).
const create_standings = (users) => {
    var standings = [[]];
    var max = 10000000;
    // Using current_standing + 1 as rank to be passed into leaderboard component.
    var current_standing = -1;


    // Organizing users into ranks based off their combined wins and ties.
    for (let i = 0; i < users.length; i++) {
        if ((users[i].app_metadata.win_count + users[i].app_metadata.tie_count) < max) {
            max = users[i].app_metadata.win_count + users[i].app_metadata.tie_count;
            standings[++current_standing] = new Array();
            standings[current_standing].push(users[i]);
        }

        else if ((users[i].app_metadata.win_count + users[i].app_metadata.tie_count) === max) {
            standings[current_standing].push(users[i]);
        }
    }

    return standings;
}

const Leaderboard = ({ users }) => {

    // Getting current user information.
    const {user, isLoading} = useUser();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, []);

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
        // Sorting users by win count + tie count.
        users.sort((a, b) => (b.app_metadata.win_count + b.app_metadata.tie_count) - (a.app_metadata.win_count + a.app_metadata.tie_count));

        // Getting standings (2D array)
        const standings = create_standings(users);
        return (
            <div className = "page-holder">
                <HAccess/>
                <div className = "leaderboard-title">Current Standings</div>
                {standings.map((users_, rank_) => <UserStanding users = {users_} rank = {rank_ + 1}/>)}
                <Footer/>
            </div>
        )

    }

    

}

// Securing web page.
const ProtectedLeaderboard = withPageAuthRequired(Leaderboard);
export default ProtectedLeaderboard;

/*
    Getting API url from env variables, getting user access token to make API calls,
    and getting current users from backend for leaderboard construction. 

    Important: we are injecting the API_URL from environment variables as this is
    an internally used API only and no one else should have the link. It is 
    secured via JWT mechanisms, but an extra measure.
*/
export async function getServerSideProps(context) {

    try {
        const response = await getAccessToken(context.req, context.res);
        
        const ACCESS_TOKEN = response.accessToken;
        const users = await get_users(process.env.API_URL, ACCESS_TOKEN);

        return {props : {users}}

    }

    catch (error) {
        console.log(error);
        return {props:{}};
    }
}