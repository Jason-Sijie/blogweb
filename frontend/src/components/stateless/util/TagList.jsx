import {Badge, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import {getBadgeColorFromString} from "../../../constants/colors";
/**
 *
 * @param props : {
 *   tags : [
 *     {
 *       "name": ""
 *     }, ...
 *   ],
 *   fontSize : "",
 *   color : "",
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
            <Link to={"/blogs?tagNames=" + tag.name} key={"tag-" + idx} reloadDocument>
              <Badge pill bg={props.color || getBadgeColorFromString(tag.name)} style={{fontSize: fontSize || "13px", margin: "5px 0px"}}>
                {tag.name}
              </Badge>
            </Link>
          </Col>
        )
      })}
    </Row>
  );
}

export default TagList;