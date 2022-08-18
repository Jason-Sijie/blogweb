import { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";

export const MyNavLink = (props) => {
  const {path, text} = props;
  const [hover, setHover] = useState(false);

  return <Nav.Link>
    <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={path}>
      <Button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{backgroundColor: (hover === true) ? "lightgrey" : "transparent", border: "0px", width: "100%"}}>
        {text}
      </Button>
    </Link>
  </Nav.Link>
}

export default MyNavLink;