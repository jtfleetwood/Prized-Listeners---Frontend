import { useRouter } from "next/router";
import { Dropdown, DropdownButton } from "react-bootstrap";

const HAccess = (props) => {

    const router = useRouter();
    
    var profile_link = `./${props.user_id}`;
    var settings_link = `../account_settings`

    if (props.current_page !== "profile") {
        profile_link = `/profiles/${props.user_id}`
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
                    <li><a href = {profile_link}>Profile</a></li>
                    <li><a href="#">Leaderboards</a></li>
                </ul>
                </div>
            </nav>
            </body>
        </>
    )
}



export default HAccess;