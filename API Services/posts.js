/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: All consumption services below consume our backend API post-related 
 * endpoints.
 * ****************************************************************************/

// Gets all posts for the current week from backend API.
export const get_posts = async (ACCESS_TOKEN) => {

    try {
        const response = await fetch(`${process.env.API_URL}posts`, {
            method:'GET',
            headers: {'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
        });
    
        const posts = await response.json();
        
        return posts;
    }

    catch (error) {
        
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

// Creates new post via API request to backend.
export const create_post = async (new_post, ALT_API_URL, ACCESS_TOKEN) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/new_post`, {
            method:'POST',
            headers:{'content-type':'application/json', authorization: `bearer ${ACCESS_TOKEN}`},
            body: JSON.stringify(new_post)
        });

        const json_response = await response.json();

        return json_response;

    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

// Adds upvote to a specific post and sets user vote status for the week.
export const add_upvote = async (post_id, u_id, ALT_API_URL, ACCESS_TOKEN) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${post_id}/new_upvote`, {
            method:'PATCH',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`},
            body:JSON.stringify({user_id:u_id})
        });
    
        const json_response = await response.json();
    
        return json_response;
    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

// Adds downvote to a specific post and sets user vote status for the week.
export const add_downvote = async (post_id, u_id, ALT_API_URL, ACCESS_TOKEN) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${post_id}/new_downvote`, {
            method:'PATCH',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`},
            body:JSON.stringify({user_id:u_id})
        });
    
        const json_response = await response.json();
    
        return json_response;
    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

// Finds post count (weekly) by user. Helpful when allowing user post for a week or not.
export const find_post_count_by_user = async (user_id, week, ALT_API_URL, ACCESS_TOKEN) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${user_id}/${week}`, {
            method:'GET',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
        });
    
        const json_response = await response.json();
    
        return json_response.count;
    }

    catch (error) {
        console.log(error);
    }
    
}

// Checks if a user has voted or not already.
export const check_user_self_vote = async (user_id, post_id, ALT_API_URL, ACCESS_TOKEN) => {
    try {
        
        const response = await fetch(`${ALT_API_URL}posts/${user_id}/${post_id}/did_self_vote`, {
            method:'GET',
            headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
        });

        const json_response = await response.json();

        return json_response.status;
    
    }

    catch (error) {
        console.log(error);
    }
    
}