/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Serves as a DTO that will ensure the integrity of new wins sent in the
 * body of API requests.
 * ****************************************************************************/

export class win {
    constructor(post_id){
        this.post_id = post_id;
    }
}