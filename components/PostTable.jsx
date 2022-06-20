import Post from './post';

const PostTable = (props) => {

    

    if (props.posts.length === 0) {
        return <span className = "no-post-message">No posts yet. Post now to get us started this week!</span> 
    }

    props.posts.sort((a, b) => b.upvotes - a.upvotes);

    return (
        <>
        {props.posts.map(post => <Post id = {post.id} ALT_API_URL = {props.ALT_API_URL} upvotes = {post.upvotes} yt_url = {post.yt_url} title = {post.title} primary_artist = {post.primary_artist}></Post>)}
        </>
    );

}

export default PostTable;
