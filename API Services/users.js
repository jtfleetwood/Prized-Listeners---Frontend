export const check_user_vote = async (user_id, ALT_API_URL) => {
    const response = await fetch(`${ALT_API_URL}users/${user_id}/check_vote`, {
        method:'GET',
        headers:{'content-type':'application/json'}
    });

    const vote_status = await response.json();

    return vote_status.did_vote;
}

export const check_new_user = async (user_id, ALT_API_URL) => {
    const response = await fetch(`${ALT_API_URL}users/${user_id}/check_new_user`, {
        method:'PATCH',
        headers:{'content-type':'application/json'}
    });

}