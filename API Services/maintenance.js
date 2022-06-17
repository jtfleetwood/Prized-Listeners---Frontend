
export const get_current_week = async (ALT_API_URL) => {
    const response = await fetch(`${ALT_API_URL}maintenance/current_week`, {
        method:'GET',
        headers:{'content-type':'application/json'}
    });

    const json_response = await response.json();

    return json_response.current_week;
}