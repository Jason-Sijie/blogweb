import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

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
        <Navbar.Brand href="/" style={{fontSize: "30px", marginRight: "2%"}}>Write Something</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <MyNavLink path={"/home"} text={"Home"}/>
            <MyNavLink path={"/blogs"} text={"Blogs"}/>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLogin ? (
              <>
                <MyNavLink path={"/home"} text={"Hello " + currentUser.username}/>
                <MyNavLink path={"/logout"} text={"Logout"}/>
              </>
            ) : (
              <>
                <MyNavLink path={"/register"} text={"Register"}/>
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