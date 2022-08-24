import {Button, Container, Nav, Navbar, ListGroup, Offcanvas} from "react-bootstrap";
import {appConfig} from "../../../config";
import {useState} from "react";
import MyNavLink from "./MyNavLink";

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
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" fixed="top" style={{height: "70px"}}>
      <Container fluid style={{margin: "0 3%", fontSize: "25px"}}>
        <Navbar.Brand href="/" style={{fontSize: "30px", marginRight: "2%"}}>{appConfig.websiteName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{backgroundColor: "black"}}>
          <Nav className="me-auto">
            <MyNavLink path={"/home"} text={"Home"}/>
            <MyNavLink path={"/blogs"} text={"All Blogs"}/>
            <MyNavLink path={"/blogs/create"} text={"New Blog"}/>
          </Nav>
          <Nav>
            {isLogin ? (
              <>
                <MyNavLink path={"/home"} text={"Hello " + currentUser.username}/>
                <Button variant="primary" onClick={handleShow} style={{backgroundColor: "grey", border: "0", minWidth:"100px"}} >
                  Menu
                </Button>
              </>
            ) : (
              <>
                <MyNavLink path={"/users/register"} text={"Sign Up"}/>
                <MyNavLink path={"/login"} text={"Sign In"}/>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        <Offcanvas show={show} placement='end' onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup>
              <MyNavLink path={"/home"} text={<ListGroup.Item>Home</ListGroup.Item>}/>
              <MyNavLink path={"/blogs/create"} text={<ListGroup.Item>Write New Blog</ListGroup.Item>}/>
              <MyNavLink path={"/users/profile"} text={<ListGroup.Item>Edit Profile</ListGroup.Item>}/>
              <MyNavLink path={"/logout"} text={<ListGroup.Item>Logout</ListGroup.Item>}/>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  )
}

export default AppHeader;