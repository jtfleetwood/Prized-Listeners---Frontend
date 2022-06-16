import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { useRouter } from 'next/router';

const HNAccess = () => {
  const router = useRouter();
    return (
      <> 
      
        <body>
        <nav className="navbar">
            <div onClick = {() => router.push('/')} className="brand-title"><em>Prized Listeners</em></div>
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
                <li><a href="/api/auth/login">Sign in</a></li>
                <li><a href="/About">About us</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            </div>
        </nav>
        </body>
          
        
      </>
    )
} 

export default HNAccess;