/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Basic navbar component with user access.
 * ****************************************************************************/

import { useRouter } from "next/router";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend";

// Component will be a responsive navbar when user is signed in.
const HAccess = (props) => {

    // Getting access to current user information and router.
    const {user} = useUser();
    const router = useRouter();
    
    // Setting relative path to route to based off current page folder (dynamic routing).
    let profile_link, settings_link;
    
    if (user) {
        profile_link = `profiles/self/${user.sub}`;

        settings_link = `account_settings`;

        if (props.current_page === "profile-self") {
            profile_link = `./${user.sub}`;
            settings_link = `../../account_settings`;
        }

        else if (props.current_page == "profile") {
            profile_link = `../profiles/self/${user.sub}`;
            settings_link = `../account_settings`;
        }

    }
    
   
    return (
        <>  
            <body>
                <nav className="navbar">
                    <div onClick = {() => router.push("/")}className="brand-title"><em>Prized Listeners</em></div>
                    <a onClick = {() => {
                        const navbarLinks = document.getElementsByClassName('navbar-links')[0]
                        navbarLinks.classList.toggle('active')
                    }}href="#" className="toggle-button">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </a>
                    <div className="navbar-links">
                        <ul>
                            
                            <li><a href = "/create_new_post">Create Post</a></li>
                            <li><a href = "#">
                                <DropdownButton bsPrefix = "profile-dropdown" title="Profile">
                                <Dropdown.Item bsPrefix = "profile-dropdown-content" href={profile_link}>Information</Dropdown.Item>
                                <Dropdown.Item bsPrefix = "profile-dropdown-content" href={settings_link}>Settings</Dropdown.Item>
                                <Dropdown.Item href = "/api/auth/logout" bsPrefix = "profile-dropdown-content">Logout</Dropdown.Item>
                                </DropdownButton>
                            </a></li>
                            <li><a href="/leaderboards">Leaderboards</a></li>
                        </ul>
                    </div>
                </nav>
            </body>
        </>
    )
}



export default HAccess;