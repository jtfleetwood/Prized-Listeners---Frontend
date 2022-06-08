import {Button, Dropdown, Table, Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const HAccess = (props) => {
    var profile_link = `../`
    if (props.current_page !== "profile") {
        profile_link = `/profiles/${props.user_id}`
    }
    return (
        <>  
            <Navbar collapseOnSelect expand="lg">
            <Container>
            <Navbar.Brand style={{color:'white', fontWeight:'bold', fontSize:'3vw'}} href="/">Prized Listeners</Navbar.Brand>
            <Navbar.Toggle style = {{backgroundColor:'white'}}aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                
                </Nav>
                <Nav>
                <Dropdown >
                    <Dropdown.Toggle style = {{color:'white', fontWeight:'bold', fontSize:'2vw', backgroundColor:'transparent', borderColor:'white', border:'none'}}><span style = {{marginLeft:'0%'}}>Profile</span></Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href={profile_link}>My Profile</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                        <Dropdown.Item href="/api/auth/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'2vw'}}eventKey={2} href="#memes">
                    Leaderboards
                </Nav.Link>
                <Nav.Link style = {{color:'white', fontWeight:'bold', fontSize:'2vw'}}href="#deets">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
            
        
        </>
    )
}



export default HAccess;