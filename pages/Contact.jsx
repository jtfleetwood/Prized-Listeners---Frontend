/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Contact us page.
 * ****************************************************************************/

import HNAccess from "../components/HNAccess";
import Footer from "../components/Footer";

// Simple contact page.
const Contact = () => {
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
                        ***WE ARE IN NEED OF MODERATORS!***
                    </p>
                </div>
                <br/>
                <br/>
                <Footer/>
            </div>
        </>
    )
}

export default Contact;