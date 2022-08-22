import {useParams} from "react-router-dom";
import UserHome from "../../stateful/home/UserHome";

/**
 * @param props : {
 *   currentUser : {
 *     username : "",
 *     id : "",
 *     uid : ""
 *   },
 *   handleModalShow : (title, content, path) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const UserHomePage = (props) => {
  const id = useParams().id

  return (
    <UserHome userId={id}
              currentUser={props.currentUser}
              handleModalShow={props.handleModalShow}/>
  )
}

export default UserHomePage;