import HAccess from "../components/HAccess";
import {Form, Button} from "react-bootstrap";
import { useState } from "react";
import { post } from "../API Services/models/post";
import { useUser } from "@auth0/nextjs-auth0";
import { create_post, find_post_count_by_user } from "../API Services/posts";
import { get_current_week } from "../API Services/maintenance";
import Footer from "../components/Footer";

const CreatePost = ({ALT_API_URL}) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [link, setLink] = useState('');
    const {user} = useUser();

    const onSubmission = async (e) => {
        e.preventDefault();

        const current_week = await get_current_week(ALT_API_URL);

        if (!title || !artist || !link) {
            alert("Please fill out all available fields!");
        }

        if (await find_post_count_by_user(user.sub, current_week, ALT_API_URL)) {
            alert("You already posted this week!");
        }

        else {

            try {
                
                const response = await create_post(new post(user.sub, title, 0, link, artist, current_week, false), ALT_API_URL);
                alert('Thanks for the submission! We look forward to seeing you on the leaderboards :)');

            }
    
            catch (error) {
                alert('Oops, an error occurred!');
            }

        }

        setTitle('');
        setArtist('');
        setLink('');
        
    
    }


    return (
        
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <div className = "page-holder">
                <HAccess/>
                <div className = "post-form-title">Give us some &#128293;</div>
                <div className = "form-container">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className = "form-label">Title</Form.Label>
                        <Form.Control className = "form-control" value = {title} onChange = {(e) => setTitle(e.target.value)} type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label className = "form-label">Artist</Form.Label>
                        <Form.Control className = "form-control" value = {artist} onChange = {(e) => setArtist(e.target.value)} placeholder="Enter artist" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label className = "form-label">Youtube</Form.Label>
                        <Form.Control className = "form-control" value = {link} onChange = {(e) => setLink(e.target.value)} type="text" placeholder="Enter link" />
                    </Form.Group>
                </Form>
                <Button style = {{fontWeight:'bold'}} onClick = {onSubmission} variant = "info" className = "post-form-button" >Create Entry</Button>
                </div>
                <Footer/>
                
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