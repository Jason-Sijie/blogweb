import {Col, Container, Row} from "react-bootstrap";
import OverlayIcon from "./OverlayIcon";

import "../../styles/blog_style.css";

/**
 * @param props: {
 *   title: ,
 *   description: ,
 *   likes: ,
 *   views: ,
 * }
 * @returns {JSX.Element}
 */
const BlogHeader = (props) => {
  return (
    <Container>
      <Container className="blog_header" style={{backgroundImage: `url(/images/blog_header_background.jpg)`}}>
        <Row style={{justifyContent: "space-between"}}>
          <Col xs={"auto"} style={{margin: "20px 20px"}}>
            <OverlayIcon trigger={['hover', 'focus']} placement={"right"} src={"/icons/views.png"} header={"Views"}
                         body={() => (<div><strong>{props.views}</strong> views in total</div>)}  />
          </Col>
          <Col xs={"auto"} style={{margin: "20px 20px"}}>
            <OverlayIcon trigger={['hover', 'focus']} placement={"left"} src={"/icons/likes.png"} header={"Likes"}
                         body={() => (<div><strong>{props.likes}</strong> likes in total</div>)}  />
          </Col>
        </Row>
        <Row>
          <div className="blog_header_title">{props.title}</div>
        </Row>
        <Row>
          <div className="blog_header_description">{props.description}</div>
        </Row>
      </Container>
    </Container>
  )
}

export default BlogHeader;