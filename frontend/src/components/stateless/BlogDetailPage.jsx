import {useParams} from "react-router-dom";
import BlogDetail from "../stateful/BlogDetail";

/**
 * @param props : {
 *   blog: {},
 *   getBlogDetailById: (id) => {},
 *   updateBlogContent: (blog) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const BlogDetailPage = (props) => {
  let params = useParams()
  return (
    <BlogDetail blogId={params.id} {...props}/>
  )
}

export default BlogDetailPage;