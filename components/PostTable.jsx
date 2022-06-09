import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import { add_upvote, add_downvote } from '../API Services/posts';
import { check_user_vote } from '../API Services/users';
import { check_user_self_vote } from '../API Services/posts';
import {useRouter} from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

const PostTable = (props) => {

    props.posts.sort((a, b) => b.upvotes - a.upvotes);
    const router = useRouter();
    const {user} = useUser();
    
    const on_upvote = async (post_id) => {

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
            <div className = "table-container">
                <Table striped bordered hover variant="dark">
                <thead>
                <tr className = "posts-column-head">
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Youtube Link</th>
                    <th>Upvotes</th>
                    <th>&#128293;?</th>
                </tr>
                </thead>
                <tbody>
                    
                    {props.posts.map((post) => {
                    return (<tr>
                        <td className = "indv-posts">{post.title}</td>
                        <td className = "indv-posts">{post.primary_artist}</td>
                        <td className = "indv-posts"><a target="_blank" href={post.yt_url}>{post.yt_url}</a></td>
                        <td className = "indv-posts"> {post.upvotes}</td>
                        <td style = {{fontSize:'1.25vw'}}className = "indv-posts"><span className = "vote-icon"onClick = {() => on_upvote(post.id)}>&#128077;</span> <br/> <span className = "vote-icon" onClick = {() => on_downvote(post.id)}>&#128078;</span></td>
                    </tr>
                    )
                    })}
                </tbody>
                </Table>
                
            </div>
        
        
        </>
    );

}

export default PostTable;
