import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';
import { add_upvote, add_downvote } from '../API Services/posts';
import {useRouter} from 'next/router';





const PostTable = (props) => {

    props.posts.sort((a, b) => b.upvotes - a.upvotes);
    const router = useRouter();

    const on_upvote = async (id) => {
        alert('Thanks for voting!');
        await add_upvote(id, props.ALT_API_URL);
        router.reload(window.location.index);
    
    }

    const on_downvote = async (id) => {
        alert('Oof! Thanks for voting!');
        await add_downvote(id, props.ALT_API_URL);
        router.reload(window.location.index);
    }

    return (
        <>
            <div className = "table-container">
                <Table striped bordered hover variant="dark">
                <thead>
                <tr>
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
                        <td>{post.title}</td>
                        <td>{post.primary_artist}</td>
                        <td> <Link href = {post.yt_url}>{post.yt_url}</Link></td>
                        <td> {post.upvotes}</td>
                        <td><span onClick = {() => on_upvote(post.id)}>&#128293;</span> &nbsp; &nbsp; &nbsp; &nbsp; <span onClick = {() => on_downvote(post.id)}>&#128169;</span></td>
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
