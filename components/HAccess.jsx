import {Button, Dropdown, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { check_new_user } from '../API Services/users';
const HAccess = () => {

    return (
        <>  
            <Navbar  collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand style={{color:'white', fontWeight:'bold', fontSize:'2vw'}} href="/">Prized Listeners</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                
                </Nav>
                <Nav>
                <Dropdown >
                    <Dropdown.Toggle style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw', backgroundColor:'transparent', borderColor:'white', border:'none'}}>
                        Profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                        <Dropdown.Item href="/api/auth/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw'}}eventKey={2} href="#memes">
                    Leaderboards
                </Nav.Link>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw'}}href="#deets">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            
        
        </>
    )
}



export default HAccess;