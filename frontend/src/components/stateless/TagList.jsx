import {Badge, Col, Row} from "react-bootstrap";
import {getColorFromString} from "../../constants/colors";

const TagList = (props) => {
  return (
    <Row>
      {props.tags.map((tag, idx) => {
        return (
          <Col key={idx} xs={"auto"}>
            <Badge pill bg={getColorFromString(tag.name)}>{tag.name}</Badge>
          </Col>
        )
      })}
    </Row>
  );
}

export default TagList;