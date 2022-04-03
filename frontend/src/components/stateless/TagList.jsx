import {Badge, Col, Row} from "react-bootstrap";
import {getBadgeColorFromString} from "../../constants/colors";
/**
 *
 * @param props = {
 *   tags : [
 *     {
 *       "name": ""
 *     }, ...
 *   ],
 *   fontSize : ""
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const TagList = (props) => {
  const {tags, fontSize} = props;

  return (
    <Row>
      {tags.map((tag, idx) => {
        return (
          <Col key={idx} xs={"auto"}>
            <Badge pill bg={getBadgeColorFromString(tag.name)} style={{fontSize: fontSize || "13px", margin: "5px 0px", backgroundColor: "aqua"}}>
              {tag.name}
            </Badge>
          </Col>
        )
      })}
    </Row>
  );
}

export default TagList;