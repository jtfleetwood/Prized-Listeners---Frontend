/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Contact us page.
 * ****************************************************************************/

import HNAccess from "../components/HNAccess";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

// Simple contact page.
const Contact = () => {

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
                <img className = "self-image" src = "me.jpg"></img>
                <div className = "about-header">CONTACT</div>
                <div className = "about-container">
                    <span>Email: jtfleetwood14@gmail.com</span>
                    <br/>
                    <br/>
                    <p>If for any reason you need to reach out to our staff, please use the above email.
                        <br/>
                        <br/>
                    </p>
                </div>
                <br/>
                <br/>
                <div className = "footer-separate"></div>
                <Footer/>
            </div>
        </>
    )
}

export default Contact;