import {useParams} from "react-router-dom";
import UserHome from "./UserHome";


/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const UserHomePage = (props) => {
  const params = useParams()
  const userId = params.id

  return (<UserHome userId={userId}/>)
}

export default UserHomePage;