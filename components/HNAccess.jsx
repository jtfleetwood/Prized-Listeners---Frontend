import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const HNAccess = () => {
    return (
      <> 
      <div className = "page-holder">
        <body>
        <nav className="navbar">
            <div className="brand-title"><em>Prized Listeners</em></div>
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
                <li><a href="/api/auth/login">Sign in</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div>
        </nav>
        </body>
        <div className= "welcome-message">LISTEN.</div>
        <div className="welcome-message" style = {{color:"white"}}>SHARE.</div>
        <div className="welcome-message">COMPETE.</div>
        </div>
      </>
    )
} 

export default HNAccess;