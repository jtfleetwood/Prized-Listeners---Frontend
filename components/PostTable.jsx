import Post from './post';

const PostTable = (props) => {

    props.posts.sort((a, b) => b.upvotes - a.upvotes);

    return (
        <>
        {props.posts.map(post => <Post id = {post.id} ALT_API_URL = {props.ALT_API_URL} upvotes = {post.upvotes} yt_url = {post.yt_url} title = {post.title} primary_artist = {post.primary_artist}></Post>)}
        </>
    );

}

export default PostTable;
