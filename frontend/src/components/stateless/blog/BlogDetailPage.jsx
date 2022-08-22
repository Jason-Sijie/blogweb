import {useParams} from "react-router-dom";
import BlogDetail from "../../stateful/blog/BlogDetail";

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
    <div style={{margin: "0 15%"}}>
      <BlogDetail blogId={params.id}
                  currentUser={props.currentUser}
                  handleModalShow={props.handleModalShow}/>
    </div>
  )
}

export default BlogDetailPage;