import { Container } from "react-bootstrap";
import CreateBlogForm from "../../stateful/blog/CreateBlogForm";

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
const CreateBlogPage = (props) => {
  return (
    <Container>
      <CreateBlogForm currentUser={props.currentUser}
                      handleModalShow={props.handleModalShow} />
    </Container>
  )
}

export default CreateBlogPage;