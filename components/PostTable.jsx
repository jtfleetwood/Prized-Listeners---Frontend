import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';

const PostTable = ({posts}) => {
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
                </tr>
                </thead>
                <tbody>
                    
                    {posts.map((post) => {
                    return (<tr>
                        <td>{post.title}</td>
                        <td>{post.primary_artist}</td>
                        <td> <Link href = {post.yt_url}>{post.yt_url}</Link></td>
                        <td> {post.upvotes}</td>
                    </tr>
                    )
                    })}
                </tbody>
                </Table>
                
            </div>
        
        
        </>
    )

}

export default PostTable;