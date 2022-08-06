import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {website} from "../../../config";

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

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" style={{height: "70px"}}>
      <Container fluid style={{margin: "0 5%", fontSize: "20px"}}>
        <Navbar.Brand href="/" style={{fontSize: "30px", marginRight: "2%"}}>{website.name}</Navbar.Brand>
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
                <MyNavLink path={"/logout"} text={"Logout"}/>
              </>
            ) : (
              <>
                <MyNavLink path={"/users/register"} text={"Register"}/>
                <MyNavLink path={"/login"} text={"Login"}/>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const MyNavLink = (props) => {
  const {path, text} = props;

  return <Nav.Link>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={path}>
      {text}
    </Link>
  </Nav.Link>
}

export default AppHeader;