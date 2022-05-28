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