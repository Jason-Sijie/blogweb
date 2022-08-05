import {useParams} from "react-router-dom";
import BlogDetail from "../../stateful/BlogDetail";

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
const BlogDetailPage = (props) => {
  let params = useParams()
  return (
    <BlogDetail blogId={params.id}
                currentUser={props.currentUser}
                handleModalShow={props.handleModalShow}/>
  )
}

export default BlogDetailPage;