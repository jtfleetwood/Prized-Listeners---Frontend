import {Button, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const HNAccess = () => {
    return (
    <> 
      <div className = "page-holder">
      <Navbar collapseOnSelect expand="lg">
      <Container>
      <Navbar.Brand style = {{color:'white', fontWeight:'bold', fontSize:'2vw'}} href="/">Prized Listeners</Navbar.Brand>
      <Navbar.Toggle style = {{backgroundColor:'white'}} aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
          
          </Nav>
        <Nav>
          <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw'}}href="/api/auth/login">&nbsp;Sign in</Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw'}}eventKey={2} href="#memes">
            About us
          </Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'1.5vw'}}href="#deets">&nbsp;Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className = "welcome-message">Who has the &#128293;?</div>
    <div className = "welcome-message1">Sign up and find out!</div>
    </div>
  </>
    )
} 

export default HNAccess;