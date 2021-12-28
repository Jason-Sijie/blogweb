import {Badge, Col, Row} from "react-bootstrap";
import {getBadgeColor} from "../../constants/colors";

const TagList = (props) => {
  return (
    <Row>
      {props.tags.map((tag, idx) => {
        return (
          <Col key={idx} xs={"auto"}>
            <Badge pill bg={getBadgeColor(tag.name)}>{tag.name}</Badge>
          </Col>
        )
      })}
    </Row>
  );
}

export default TagList;