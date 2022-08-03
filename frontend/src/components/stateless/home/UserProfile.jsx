import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import {link} from "@uiw/react-md-editor";

/**
 * @param props : {
 *   name : "",
 *   email : "",
 *   aboutMe: "",
 *   links: {}
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
        {Object.keys(links).map((keyName, keyIndex) => {
          return(
            <ListGroup.Item action variant="light" href={links[keyName]}>
              <Row>
                <Col xs={"3"} style={{alignSelf: "left"}}>{keyName}:</Col>
                <Col xs={"9"} style={{alignSelf: "right"}}>{links[keyName]}</Col>
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
      <Card.Img className={"home_profile_avatar"} variant="top" src="/images/profile_avatar.jpg" />
      <Card.Body>
        <Card.Title as={"h2"}>
          {props.name}
        </Card.Title>

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
              100
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
              100
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserProfile;