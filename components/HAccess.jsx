import { useRouter } from "next/router";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useUser } from "@auth0/nextjs-auth0/dist/frontend";

const HAccess = (props) => {
    const {user, isLoading} = useUser();
    const router = useRouter();
    
    var profile_link = `./${user.sub}`;
    var settings_link = `../account_settings`

    if (props.current_page !== "profile") {
        profile_link = `/profiles/${user.sub}`
        settings_link = 'account_settings'
    }

    return (
        <>  
            <body>
            <nav className="navbar">
                <div onClick = {() => router.push("/")}className="brand-title"><em>Prized Listeners</em></div>
                <a onClick = {() => {
                    const navbarLinks = document.getElementsByClassName('navbar-links')[0]
                    navbarLinks.classList.toggle('active')
                }}href="#" class="toggle-button">
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
                    <li><a href="#">Leaderboards</a></li>
                </ul>
                </div>
            </nav>

            </body>
        </>
    )
}



export default HAccess;