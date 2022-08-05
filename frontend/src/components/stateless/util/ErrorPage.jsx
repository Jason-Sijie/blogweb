import {Container} from "react-bootstrap";
import {useLocation} from "react-router-dom";

/**
 * @param props : {
 *   status : "" (optional),
 *   message : "" (optional)
 * }
 * @returns {*}
 * @constructor
 */
const ErrorPage = (props) => {
  const location = useLocation();

  let status = props.status
  if (status == null && location.state != null) {
    status = location.state.status
  }
  let message = props.message
  if (message == null && location.state != null) {
    message = location.state.message
  }

  return (
    <div style={{paddingTop: "50px"}}>
      <Container className={"shadow"} style={{padding: "20px"}}>
        <h2>ERROR {status || ""}</h2>
        <h3>{message || "Cannot load page"}</h3>
      </Container>
    </div>
  )
}

export default ErrorPage