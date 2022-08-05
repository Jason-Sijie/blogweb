import CreateBlogForm from "../../stateful/CreateBlogForm";

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
    <CreateBlogForm currentUser={props.currentUser}
                    handleModalShow={props.handleModalShow} />
  )
}

export default CreateBlogPage;