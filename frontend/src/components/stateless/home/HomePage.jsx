import {Col, Container, Row} from "react-bootstrap";
import HomeHeader from "./HomeHeader";
import HomeContent from "./HomeContent";
import HomeProfile from "./HomeProfile";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomePage = (props) => {
  return (
    <Container fluid style={{margin: 0, padding: 0}}>
      <HomeHeader name={"Test User"}
                  email={"test-account@example.com"} />
      <Row>
        <Col xs={3} style={{margin: "0% 2% 4% 4%", position: "relative", top: "-200px"}}>
          <HomeProfile />
        </Col>
        <Col xs={8} style={{margin: "3% 0%"}}>
          <HomeContent authorId={props.user.currentUser.uid} />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage;