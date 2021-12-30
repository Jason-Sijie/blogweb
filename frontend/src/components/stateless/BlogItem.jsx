import {Row, Col, Card, Button} from "react-bootstrap";
import TagList from "./TagList";
import {Link} from "react-router-dom";

/**
 * props = {
 *   blog: {
 *       ...
 *   },
 * }
 */
const BlogItem = (props) => {
  return (
    <Card style={{margin: 0, padding: 0}}>
      <Card.Header>
        <Row style={{justifyContent: "space-between"}}>
          <Col xs={"auto"}> Views: {props.blog.views} </Col>
          <Col xs={"auto"}> Likes: {props.blog.likes} </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Card.Title as={"h2"}>
          {props.blog.title}
        </Card.Title>
        <Card.Subtitle style={{margin: "10px"}}>
          <TagList tags={props.blog.tags || []} />
        </Card.Subtitle>
        <Card.Text style={{color: "grey"}}>
          {props.blog.description}
        </Card.Text>
        <Link to={`/blogs/${props.blog.id}`} key={props.blog.id}>
          <Button style={{float:"right"}} variant="primary" >Read More</Button>
        </Link>
      </Card.Body>
      <Card.Footer>
        <Row style={{justifyContent: "space-between"}}>
          <Col xs={"auto"}>
            Create Time: <div style={{color:"grey"}}>{new Date(props.blog.gmtCreate).toLocaleString()}</div>
          </Col>
          <Col xs={"auto"}>
            Last Modified: <div style={{color:"grey"}}>{new Date(props.blog.gmtUpdate).toLocaleString()}</div>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}
 
export default BlogItem;