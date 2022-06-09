export const check_user_vote = async (user_id, ALT_API_URL) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/check_vote`, {
            method:'GET',
            headers:{'content-type':'application/json'}
        });
    
        const vote_status = await response.json();
    
        return vote_status.did_vote;
    }

    catch (error) {
        console.log(error);
    }
    
}

export const check_new_user = async (user_id, ALT_API_URL) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/check_new_user`, {
            method:'PATCH',
            headers:{'content-type':'application/json'}
        });
    }

    catch (error) {
        console.log(error);
    }
    
    
}

export const get_user_win_count = async (user_id, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}wins/user/${user_id}`, {
            method:'GET',
            headers:{'content-type':'application/json'}
        });

        const json_response = await response.json();
        return json_response.count;
    }

    catch (error) {
        console.log(error);
    }
    

}

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

export const change_user_display_name = async (ALT_API_URL, user_id, new_name) => {
    try {
        const response = await fetch(`${ALT_API_URL}users/${user_id}/change_user_display_name`, {
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({name:new_name})
        });

        return response;
    }

    catch (error) {
        console.log(error);
    }
}