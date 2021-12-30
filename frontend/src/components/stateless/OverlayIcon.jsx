import {OverlayTrigger, Popover} from "react-bootstrap";
import FigureImage from "react-bootstrap/FigureImage";

/**
 * @param props: {
 *   trigger: ,
 *   placement: ,
 *   src: ,
 *   header: ,
 *   body: () => {JSX.Element},
 *   width: (optional),
 *   height: (optional),
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const OverlayIcon = (props) => {
  return (
    <OverlayTrigger trigger={props.trigger} placement={props.placement} overlay={
      <Popover>
        <Popover.Header as="h3">{props.header}</Popover.Header>
        <Popover.Body>
          {props.body()}
        </Popover.Body>
      </Popover>
    }>
      <FigureImage width={props.width || "40px"} height={props.height || "40px"} src={props.src} />
    </OverlayTrigger>
  )
}

export default OverlayIcon;