import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import {useUser} from '@auth0/nextjs-auth0';


const Home = ({entries}) => {
  const {user} = useUser();

  if (!user) {
    return(
    <> 
      <div className = "page-holder">
      <Navbar  collapseOnSelect expand="lg">
      <Container>
      <Navbar.Brand style = {{color:'white', fontWeight:'bold'}}href="#home">Prized Listeners</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
          
          </Nav>
        <Nav>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}href="/api/auth/login">Sign in</Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}eventKey={2} href="#memes">
            About us
          </Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}href="#deets">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className = "welcome-message">Who has the &#128293;?</div>
    <div className = "welcome-message1">Sign up and find out!</div>
    </div>
  </>
    );
  }

  else {
    return (
      <> 
      <div className = "page-holder">
      <Navbar  collapseOnSelect expand="lg">
      <Container>
      <Navbar.Brand style = {{color:'white', fontWeight:'bold'}}href="#home">Prized Listeners</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          
        </Nav>
        <Nav>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}href="/api/auth/logout">{user.nickname}</Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}eventKey={2} href="#memes">
            About us
          </Nav.Link>
          <Nav.Link style = {{color:'white', fontWeight:'bold'}}href="#deets">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className = "signed-in-home">Recent Entries</div>
    <div className = "signed-in-home">{entries[0]}</div>
    <div className = "signed-in-home">{entries[0]}</div>
    <div className = "signed-in-home">{entries[0]}</div>
    <div className = "signed-in-home">{entries[0]}</div>
    <div className = "signed-in-home">{entries[0]}</div>

    </div>
    </>
    )
  }

}

export default Home;

export async function getServerSideProps() {
  const entries = [1, 2, 3, 4];

  return {props : {entries}};
}