/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Serves as a DTO that will ensure the integrity of new posts sent in the
 * body of API requests.
 * ****************************************************************************/

export class post {
    constructor(user_id, title, upvotes, yt_url, primary_artist, contest_week, is_winner) {
        this.user_id = user_id;
        this.title = title;
        this.upvotes = upvotes;
        this.yt_url = yt_url;
        this.primary_artist = primary_artist;
        this.contest_week = contest_week;
        this.is_winner = is_winner;
    }
}