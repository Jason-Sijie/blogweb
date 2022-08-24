import {Card, Col, ListGroup, Row} from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * @param props : {
 *   userId: num,
 *   name : "",
 *   email : "",
 *   aboutMe: "",
 *   links: {},
 *   totalViews: num,
 *   totalLikes: num,
 *   avatar: url,
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserProfile = (props) => {
  let getLinks = (links) => {
    if (links != null && Object.keys(links).length > 0)
    return (<>
      <hr />
      <Card.Text as={"h4"}>
        Links
      </Card.Text>
      <Card.Text  style={{margin: "20px 0"}}>
        <ListGroup>
        {links.map((link) => {
          return(
            <ListGroup.Item action variant="light" href={link.href}>
              <Row>
                <Col xs={"4"} style={{alignSelf: "left"}}>{link.name}:</Col>
                <Col xs={"8"} style={{alignSelf: "right"}}>{link.href}</Col>
              </Row>
            </ListGroup.Item>
          )
        })}
        </ListGroup>
      </Card.Text>
      <hr />
    </>)
  }

  return (
    <Card className={"shadow p-3 mb-5 bg-white rounded"}>
      <div className={"home_profile_avatar"}>
        <img src={props.avatar} 
            alt={"profile_avatar"}
            style={{padding: "5%", borderRadius: "50%", objectFit: "cover", width:"100%", height:"100%"}}/>
      </div>
      <Card.Body>
        <Link style={{color: "black"}} to={"/users/" + props.userId + "/home"}>
          <Card.Title as={"h1"}>
            {props.name}
          </Card.Title>
        </Link>
        
        <Card.Text as={"h4"}>
          {props.email}
        </Card.Text>

        <hr />
        <Card.Text as={"h4"}>
          About Me
        </Card.Text>
        <Card.Text  style={{margin: "20px 0"}}>
          {props.aboutMe}
        </Card.Text>

        {getLinks(props.links)}

        <Card.Text style={{color: "grey", paddingLeft: "20px"}}>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={6}>
              Blog Views:
            </Col>
            <Col xs={6} className={"text-center"}>
              {props.totalViews}
            </Col>
          </Row>
        </Card.Text>
        <hr />

        <Card.Text style={{color: "grey", paddingLeft: "20px"}}>
          <Row style={{justifyContent: "space-between"}}>
            <Col xs={6}>
              Blog Likes:
            </Col>
            <Col xs={6} className={"text-center"}>
              {props.totalLikes}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserProfile;