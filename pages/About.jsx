/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: About us page.
 * ****************************************************************************/

import HNAccess from "../components/HNAccess";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Head  from "next/head";

// Simple about us page. No constraints here as anyone should be able to view.
const AboutUs = () => {

    const [loading, setLoading] = useState(false);

    // Smooth page loading animation.
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, []);

    // Check if page loading.
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

    return (
        <>
            <div className = "page-holder">
                <HNAccess/>
                <div className = "about-header">OUR MISSION</div>
                <div className = "about-container">
                    <p>Prized Listeners aims to accomplish 3 things:
                        <br/>
                        <span>#1: Connect you with better music.</span>
                        <br/>
                        <span>#2: Connect you with your friends.</span>
                        <br/>
                        <span>#3: Find out who has the best taste in music!</span>
                    </p>
                </div>
                <div className = "about-header">HOW TO PARTICIPATE</div>
                <div className = "about-container">
                    <p> Signup &#8594; Post &#8594; Vote
                        <br/>
                        <span>You can begin by signing up for an account <a className = "about-signup-link" href = "/api/auth/login">here.</a></span>
                        <br/>
                        <br/>
                        <p>After you are signed up, feel free to post your favorite music, and vote on the best/worst songs you've found!</p>
                    </p>
                </div>
                <div className = "about-header">GENERAL RULES</div>
                <div className = "about-container">
                    <p> The below rules are enforced by our application.
                        <br/>
                        <span>#1: You are allowed only <b>one</b> post per week.</span>
                        <br/>
                        <span>#2: You are allowed only <b>one</b> vote per week.</span>
                        <br/>
                        <p>#3: You cannot reuse <b>any</b> of your previous posts, or anyone else's posts!</p>
                        <br/>
                        <p>
                            Any reports of misusing the available functionality to include whatever titles, artists, or links you would like will result in a <b>ban</b>.
                        </p>
                    </p>
                </div>
                <br/>
                <br/>
                <Footer/>
            </div>
        
        </>
    )
}

export default AboutUs;