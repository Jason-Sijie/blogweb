import {Button, Container, Nav, Navbar, ListGroup, Offcanvas} from "react-bootstrap";
import {Link} from "react-router-dom";
import {appConfig} from "../../../config";
import {useState} from "react";

/**
 * @param props: {
 *   currentUser: {
 *     id: 0,
 *     uid: "",
 *     username: "",
 *   },
 *   isLogin: false
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const AppHeader = (props) => {
  const {currentUser, isLogin} = props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{height: "70px"}}>
      <Container fluid style={{margin: "0 5%", fontSize: "20px"}}>
        <Navbar.Brand href="/" style={{fontSize: "30px", marginRight: "2%"}}>{appConfig.websiteName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <MyNavLink path={"/home"} text={"Home"}/>
            <MyNavLink path={"/blogs"} text={"All Blogs"}/>
          </Nav>
          <Nav>
            {isLogin ? (
              <>
                <MyNavLink path={"/home"} text={"Hello " + currentUser.username}/>
                <Button variant="primary" onClick={handleShow} style={{backgroundColor: "transparent"}}>
                  More Options
                </Button>
              </>
            ) : (
              <>
                <MyNavLink path={"/users/register"} text={"Register"}/>
                <MyNavLink path={"/login"} text={"Login"}/>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <Offcanvas show={show} placement='end' onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1">Option 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                  Disabled
                </Nav.Link>
              </Nav.Item>
            </Nav> */}
            <ListGroup>
              <MyNavLink path={"/home"} text={<ListGroup.Item>Home</ListGroup.Item>}/>
              <MyNavLink path={"/blogs/create"} text={<ListGroup.Item>Write New Blog</ListGroup.Item>}/>
              <MyNavLink path={"/users/" + currentUser.id + "/profile"} text={<ListGroup.Item>Edit Profile</ListGroup.Item>}/>
              <MyNavLink path={"/logout"} text={<ListGroup.Item>Logout</ListGroup.Item>}/>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  )
}

const MyNavLink = (props) => {
  const {path, text} = props;
  const [hover, setHover] = useState(false);

  return <Nav.Link>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={path}>
      <Button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{backgroundColor: (hover == true) ? "lightgrey" : "transparent", border: "0px", width: "100%"}}>
        {text}
      </Button>
    </Link>
  </Nav.Link>
}

export default AppHeader;