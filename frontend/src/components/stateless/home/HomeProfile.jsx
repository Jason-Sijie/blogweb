import {Button, Card} from "react-bootstrap";

/**
 * @param props : {
 *   name : "",
 *
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const HomeProfile = (props) => {
  return (
    <Card className={"shadow p-3 mb-5 bg-white rounded"}>
      <Card.Img className={"home_profile_avatar"} variant="top" src="/images/profile_avatar.jpg" />
      <Card.Body>
        <Card.Title as={"h2"}>
          {props.name}
        </Card.Title>
        <hr />
        <Card.Text as={"h4"}>
          About
        </Card.Text>

        <Card.Text  style={{margin: "20px 0"}}>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <hr />

        <Card.Text style={{color: "grey", paddingLeft: "20px"}}>
          Blog Views:
        </Card.Text>
        <hr />

        <Card.Text style={{color: "grey", paddingLeft: "20px"}}>
          Blog Likes:
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default HomeProfile;