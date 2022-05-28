import HAccess from "../components/HAccess";
import {Form, Button} from "react-bootstrap";
import { useState } from "react";
import { post } from "../API Services/models/post";
import { useUser } from "@auth0/nextjs-auth0";
import { create_post } from "../API Services/posts";

const CreatePost = ({ALT_API_URL}) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [link, setLink] = useState('');
    const {user} = useUser();

    const onSubmission = async (e) => {
        e.preventDefault();

        if (!title || !artist || !link) {
            alert("Please fill out all available fields!");
        }

        else {

            try {
                
                const response = await create_post(new post(user.sub, title, 0, link, artist, 0, false), ALT_API_URL);

            }
    
            catch (error) {
                alert(error.message);
            }

        }

        setTitle('');
        setArtist('');
        setLink('');
        
    
    }


    return (
        
        <>
            <div className = "page-holder">
                <HAccess/>
                <div className = "post-form-title">Give us some &#128293;</div>
                <div className = "form-container">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label style={{color:'white', fontWeight:'bold'}}>Title</Form.Label>
                        <Form.Control value = {title} onChange = {(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label style={{color:'white', fontWeight:'bold'}}>Artist</Form.Label>
                        <Form.Control value = {artist} onChange = {(e) => setArtist(e.target.value)} placeholder="Enter artist" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label style={{color:'white', fontWeight:'bold'}}>Youtube</Form.Label>
                        <Form.Control value = {link} onChange = {(e) => setLink(e.target.value)} type="text" placeholder="Enter link" />
                    </Form.Group>
                </Form>
                <Button onClick = {onSubmission} style = {{fontWeight:'bold', color:'rgb(23, 26, 26)'}} variant = "info" className = "post-form-button" >Create Entry</Button>
                
                </div>
            </div>
        </>
    );
    
}

export default CreatePost;

export async function getServerSideProps() {
    // Actual need of API URL is called in browser-side code, thus not available as process.env var. Also not able to config with dotenv pkg due to pkg not being available on server side.
    // See cannot resolve: fs module w/ NextJS for more info... 
    const ALT_API_URL = process.env.API_URL;
    
    return {props : {ALT_API_URL}};
}