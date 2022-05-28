import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const HAccess = () => {
    return (
        <>  
            <Navbar  collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand style={{color:'white', fontWeight:'bold', fontSize:'225%'}} href="/">Prized Listeners</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                
                </Nav>
                <Nav>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'150%'}}href="/api/auth/logout">Profile</Nav.Link>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'150%'}}eventKey={2} href="#memes">
                    About us
                </Nav.Link>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'150%'}}href="#deets">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            
        
        </>
    )
}

export default HAccess;