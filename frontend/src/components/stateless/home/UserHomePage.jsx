import {Col, Container, Row} from "react-bootstrap";
import UserHomeHeader from "./UserHomeHeader";
import UserHomeContent from "./UserHomeContent";
import UserProfile from "./UserProfile";
import {useParams} from "react-router-dom";
import UserHome from "../../stateful/UserHome";

/**
 * @param props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   }
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserHomePage = (props) => {
  const id = useParams().id

  return (
    <UserHome userId={id} currentUser={props.currentUser}/>
  )
}

export default UserHomePage;