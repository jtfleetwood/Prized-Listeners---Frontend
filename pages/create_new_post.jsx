/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Create new post page.
 * ****************************************************************************/

import HAccess from "../components/HAccess";
import {Form, Button} from "react-bootstrap";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { post } from "../API Services/models/post";
import { useUser } from "@auth0/nextjs-auth0";
import { create_post, find_post_count_by_user } from "../API Services/posts";
import { get_current_week } from "../API Services/maintenance";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";

/*
    Below method will parse a given youtube link to translate it to an embed link.
    Will handle web urls, and mobile generated urls.
*/
const parseLink = (link) => {
    let index = link.indexOf("watch?v=");
    
    if (index > -1) {
        return link.slice(index + 8);
    }

    // Check for mobile link..
    index = link.indexOf("youtu.be/");

    if (index > -1) {
        return link.slice(index+9);
    }
    
}

const CreatePost = ({ALT_API_URL, ACCESS_TOKEN}) => {

    // Using hooks to handle user input.
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [link, setLink] = useState('');
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Smooth page loading animation.
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 250)
    }, []);

    // Called when user submits new post.
    const onSubmission = async (e) => {
        e.preventDefault();

        // Using this to set current week for post.
        const current_week = await get_current_week(ALT_API_URL, ACCESS_TOKEN);

        // Data validation.
        if (!title || !artist || !link) {
            alert("Please fill out all available fields!");
        }

        // Checking to make sure user has not already posted this week.
        if (await find_post_count_by_user(user.sub, current_week, ALT_API_URL, ACCESS_TOKEN)) {
            alert("You already posted this week!");
        }

        // Creating post via backend API call.
        else {

            try {
                
                // Converting provided YT link to embed link.
                const converted_link = "https://www.youtube.com/embed/"+parseLink(link);
                const response = await create_post(new post(user.sub, title, 0, converted_link, artist, current_week, false), ALT_API_URL, ACCESS_TOKEN);

                // If resource successfully, added notify user.
                if (response.status === 201) {
                    alert('Thanks for the submission! We look forward to seeing you on the leaderboards :)');
                }
                
                // If not, cause was due to constraint error with DB - thus reused song provided.
                else {
                    alert('That song has already been posted. Sorry, pick another one!');
                }
            }
    
            catch (error) {
                alert('Oops, an error occurred!');
            }

        }

        setTitle('');
        setArtist('');
        setLink('');
        router.push("/");
    
    }

    // If page loading.
    if (loading) {
        return (
            <>
                <div class="center">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </>
        )
    }

    // If user is signed in, and page has loaded.
    else {
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


    
    
}

export default CreatePost;

export async function getServerSideProps(context) {
    // Actual need of API URL is called in browser-side code, thus not available as process.env var. Also not able to config with dotenv pkg due to pkg not being available on server side.
    // See cannot resolve: fs module w/ NextJS for more info... 

    try {
        const ALT_API_URL = process.env.API_URL;
        const response = await getAccessToken(context.req, context.res);

        const ACCESS_TOKEN = response.accessToken;
        
        return {props : {ALT_API_URL, ACCESS_TOKEN}};
    }

    catch (error) {
        console.log(error);
    }
    
}