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