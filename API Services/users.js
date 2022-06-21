
/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: All consumption services below will consume backend API user-related endpoints.
 * Important to note that these backend API endpoints are actually integrated with
 * Auth0 management API. We are only using the management API from an administrative perspective.
 * ****************************************************************************/

// Checking to see if a user has voted or not yet. Auth0 handled data...
export const check_user_vote = async (user_id, ALT_API_URL, ACCESS_TOKEN) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/check_vote`, {
            method:'GET',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
        });
    
        const vote_status = await response.json();
    
        return vote_status.did_vote;
    }

    catch (error) {
        console.log(error);
    }
    
}

// Checking to see if this is the first time a user has logged in, need to init app metadata if so.
export const check_new_user = async (user_id, ALT_API_URL, ACCESS_TOKEN) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/check_new_user`, {
            method:'PATCH',
            headers:{'content-type':'application/json', authorization: `bearer ${ACCESS_TOKEN}`}
        });
    }

    catch (error) {
        console.log(error);
    }
    
    
}

// Gets user win count from backend API. Auth0 handled data btw.
export const get_user_win_count = async (user_id, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}wins/user/${user_id}`, {
            method:'GET',
            headers:{'content-type':'application/json'}
        });

        const json_response = await response.json();
        return json_response.win_count;
    }

    catch (error) {
        console.log(error);
    }

}

// Gets user tie count from backend API.
export const get_user_tie_count = async (user_id, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}wins/user/${user_id}`, {
            method:'GET',
            headers:{'content-type':'application/json'}
        });

        const json_response = await response.json();
        return json_response.win_count;
    }

    catch (error) {
        console.log(error);
    }

}

// Resets a user password via the front-end auth0 api. Sends reset password email to specifc user.
export const reset_user_password = async (email, auth_url, client_id) => {

    try {
        const response = await fetch(`${auth_url}/dbconnections/change_password`, {
            method:'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                client_id,
                email,
                connection:"Username-Password-Authentication"
            })
        });
    
        return response;
    }

    catch (error) {
        console.log(error);
    }
    
}

// Changes a user's display name via the Auth0 management api integration in our backend API.
export const change_user_display_name = async (ALT_API_URL, user_id, new_name, ACCESS_TOKEN) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/change_user_display_name`, {
            method:'PATCH',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`},
            body:JSON.stringify({name:new_name})
        });

        return response;
    }

    catch (error) {
        console.log(error);
    }
}

// Gets all users from the Auth0 hosted DB via backend integration with Auth0 API.
export const get_users = async (ALT_API_URL, ACCESS_TOKEN) => {
    
    try {
        const response = await fetch(`${ALT_API_URL}users`, {
            method:'GET',
            headers:{'content-type':'application/json', authorization: `bearer ${ACCESS_TOKEN}`}
        });

        const users = await response.json();

        return users;
    }

    catch (error) {
        console.log(error);
    }

}

// Gets a specific user by their id via backend integration with Auth0 API.
export const get_user_by_id = async (ALT_API_URL, user_id, ACCESS_TOKEN) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}`, {
            method:'GET',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
        });

        const user = await response.json();

        return user;
    }

    catch(error) {
        console.log(error);
    }
}
