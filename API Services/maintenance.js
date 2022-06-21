/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Serves as a front-end consumption service that will get the current
 * week from our backend API.
 * ****************************************************************************/

// Gets current week from variable table in DB.
export const get_current_week = async (ALT_API_URL, ACCESS_TOKEN) => {
    const response = await fetch(`${ALT_API_URL}maintenance/current_week`, {
        method:'GET',
        headers:{'content-type':'application/json', authorization:`bearer ${ACCESS_TOKEN}`}
    });

    const json_response = await response.json();

    return json_response.current_week;
}
