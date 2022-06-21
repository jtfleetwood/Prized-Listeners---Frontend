/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Basic post component that holds information for a single post.
 * ****************************************************************************/

import { add_upvote, add_downvote } from '../API Services/posts';
import { check_user_vote } from '../API Services/users';
import { check_user_self_vote } from '../API Services/posts';
import {useRouter} from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';


// Component to serve as individual post.
const Post = (props) => {

    // Used to route to different page.
    const router = useRouter();
    // Gives use current user information.
    const {user} = useUser();

    // Called when user votes on a particular post.
    const on_upvote = async (post_id) => {

        try {
            // Check if the user attempts to vote on their own post.
            if (await check_user_self_vote(user.sub, post_id, props.ALT_API_URL, props.ACCESS_TOKEN)) {
                alert('You cannot upvote your own post!');
                return;
            }

            // Check if the user has already voted this week.
            else if (await check_user_vote(user.sub, props.ALT_API_URL, props.ACCESS_TOKEN)) {
                alert('You already voted this week!');
                return;
            }

            // Set upvote to particular post and set 'voted' for user status for week.
            alert('Thanks for voting!');
            await add_upvote(post_id, user.sub, props.ALT_API_URL, props.ACCESS_TOKEN);

            // Redirect to home page.
            router.reload(window.location.index);
        }

        catch (error) {
            console.log(error);
        }

        
    
    }

    // Called when user attempts to downvote post.
    const on_downvote = async (post_id) => {

        try {

            // Checks if user attempts to vote on their own post.
            if (await check_user_self_vote(user.sub, post_id, props.ALT_API_URL, props.ACCESS_TOKEN)) {
                alert('You cannot downvote your own post!');
                return;
            }

            // Checks if user has already voted this week.
            else if (await check_user_vote(user.sub, props.ALT_API_URL, props.ACCESS_TOKEN)) {
                alert('You already voted this week!');
                return;
            }
            
            // Setting downvote to post and setting user vote status for week.
            alert('Oof! Thanks for voting!');
            await add_downvote(post_id, user.sub, props.ALT_API_URL, props.ACCESS_TOKEN);
            router.reload(window.location.index);
        }

        catch(error) {
            console.log(error);
        }

        
    }

    // Component
    return (
        <>
        <div className = "post-container">
          <iframe className = "yt-link" src ={props.yt_url} allowFullScreen></iframe>
          <div className = "song-box">
            <span className = "song-title">{props.title}</span>
            <span className = "song-artist">{props.primary_artist}</span>
          </div>
          <div className = "display-votes-container">
            <span className = "display-votes">{props.upvotes}</span>
          </div>
          <div className = "vote-container">
            <div className = "upvote-button" onClick = {() => on_upvote(props.id)}>&#128077;</div>
            <div className = "downvote-button" onClick = {() => on_downvote(props.id)}>&#128078;</div>
          </div>
        </div>
        </>
    )
    
}

export default Post;