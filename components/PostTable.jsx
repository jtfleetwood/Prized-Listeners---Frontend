/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Basic component that maps out an array of posts as components.
 * ****************************************************************************/
import Post from './post';

const PostTable = (props) => {

    // If no posts yet this week.
    if (props.posts.length === 0) {
        return <span className = "no-post-message">No posts yet. Post now to get us started this week!</span> 
    }

    // Sorting posts displayed from upvotes DESC
    props.posts.sort((a, b) => b.upvotes - a.upvotes);

    // Mapping posts array to give array of post components on page.
    return (
        <>
        {props.posts.map(post => <Post ACCESS_TOKEN = {props.ACCESS_TOKEN} id = {post.id} ALT_API_URL = {props.ALT_API_URL} upvotes = {post.upvotes} yt_url = {post.yt_url} title = {post.title} primary_artist = {post.primary_artist}></Post>)}
        </>
    );

}

export default PostTable;
