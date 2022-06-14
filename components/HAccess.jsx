import {Button, Dropdown, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const HAccess = (props) => {
    
    var profile_link = `./${props.user_id}`;
    var settings_link = `../account_settings`

    if (props.current_page !== "profile") {
        profile_link = `/profiles/${props.user_id}`
        settings_link = 'account_settings'
    }

    return (
        <>  
            <head>
            <script src="script.js" defer></script>
            <title>Responsive Navbar</title>
            </head>
            <body>
            <nav class="navbar">
                <div class="brand-title"><em>Prized Listeners</em></div>
                <a onClick = {() => {
                    const navbarLinks = document.getElementsByClassName('navbar-links')[0]
                    navbarLinks.classList.toggle('active')
                }}href="#" class="toggle-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
                </a>
                <div class="navbar-links">
                <ul>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Leaderboards</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                </div>
            </nav>
            </body>
        </>
    )
}



export default HAccess;