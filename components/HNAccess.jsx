/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Basic navbar component without user access.
 * ****************************************************************************/

import { useRouter } from 'next/router';

// Component will be responsive navbar when user is not signed in yet.
const HNAccess = () => {
  
  // Using router for title click.
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
                    <li><a href="/Contact">Contact</a></li>
                </ul>
              </div>
          </nav>
        </body>
          
        
      </>
    )
} 

export default HNAccess;