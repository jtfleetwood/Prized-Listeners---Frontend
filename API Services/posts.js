export const get_posts = async () => {

    try {
        const response = await fetch(`${process.env.API_URL}posts`, {
            method:'GET',
            headers: {'content-type':'application/json'}
        });
    
        const posts = await response.json();
        
        return posts;
    }

    catch (error) {
        
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

export const create_post = async (new_post, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/new_post`, {
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify(new_post)
        });

        const json_response = await response.json();

        return json_response;

    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

export const add_upvote = async (post_id, u_id, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${post_id}/new_upvote`, {
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({user_id:u_id})
        });
    
        const json_response = await response.json();
    
        return json_response;
    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

export const add_downvote = async (post_id, u_id, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${post_id}/new_downvote`, {
            method:'PATCH',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({user_id:u_id})
        });
    
        const json_response = await response.json();
    
        return json_response;
    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
    
}

export const find_post_count_by_user = async (user_id, week, ALT_API_URL) => {

    try {
        const response = await fetch(`${ALT_API_URL}posts/${user_id}/${week}`, {
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

export const check_user_self_vote = async (user_id, post_id, ALT_API_URL) => {
    try {
        const response = await fetch(`${ALT_API_URL}posts/${user_id}/${post_id}/did_self_vote`, {
            method:'GET',
            headers:{'content-type':'application/json'}
        });

        const json_response = await response.json();

        return json_response.status;
    
    }

    catch (error) {
        console.log(error);
    }
    
}