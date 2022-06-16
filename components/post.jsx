import { add_upvote, add_downvote } from '../API Services/posts';
import { check_user_vote } from '../API Services/users';
import { check_user_self_vote } from '../API Services/posts';
import {useRouter} from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

const parseLink = (link) => {
    const index = link.indexOf("watch?v=");
    return link.slice(index + 8);
}


const Post = (props) => {

    const router = useRouter();
    const {user} = useUser();

    const on_upvote = async (post_id) => {
        console.log(post_id);

        try {
            if (await check_user_self_vote(user.sub, post_id, props.ALT_API_URL)) {
                alert('You cannot upvote your own post!');
                return;
            }

            else if (await check_user_vote(user.sub, props.ALT_API_URL)) {
                alert('You already voted this week!');
                return;
            }

            alert('Thanks for voting!');
            await add_upvote(post_id, user.sub, props.ALT_API_URL);
            router.reload(window.location.index);
        }

        catch (error) {
            console.log(error);
        }

        
    
    }

    const on_downvote = async (post_id) => {

        try {


            if (await check_user_self_vote(user.sub, post_id, props.ALT_API_URL)) {
                alert('You cannot downvote your own post!');
                return;
            }

            else if (await check_user_vote(user.sub, props.ALT_API_URL)) {
                alert('You already voted this week!');
                return;
            }
    
            alert('Oof! Thanks for voting!');
            await add_downvote(post_id, user.sub, props.ALT_API_URL);
            router.reload(window.location.index);
        }

        catch(error) {
            console.log(error);
        }

        
    }

    return (
        <>
        <div className = "post-container">
          <iframe className = "yt-link" src ={"https://www.youtube.com/embed/"+parseLink(props.yt_url)} allowFullScreen></iframe>
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