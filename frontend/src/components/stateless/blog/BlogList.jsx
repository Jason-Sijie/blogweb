import {Container, Row, Col} from "react-bootstrap";
import BlogItem from "./BlogItem";
import Pages from "../util/Pages";

/**
 * @param props : {
 *   content : [],        // list of blogs
 *   currentPage : int,   // current page number
 *   pageSize : int,      // number of element in each page
 *   totalPages : int     // total number of pages
 *   getBlogsWithSearchParams : (params) => {}
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const BlogList = (props) => {
  let getPageContentAndUpdatePagination = (page, size) => {
    props.getBlogsWithSearchParams({
      page: page,
      size: size
    })
  }

  return (
    <Container>
      {(props.content || []).map((item, idx) => {
        return (
          <Row key={idx} style={{margin: "10px 0"}}>
            <BlogItem blog={item} />
          </Row>
        );
      })}

      {props.totalPages === 0 ? (<>
        <Row style={{textAlign: "center", padding: "20px 0px 40px"}}>
          <h1>No Result</h1>
        </Row>
      </>) : (<></>)}

      <Row>
        <Pages currentPage={props.currentPage}
               totalPages={props.totalPages || 0}
               pageSize={props.pageSize}
               leftNum={3}
               rightNum={3}
               getPageContentAndUpdatePagination={getPageContentAndUpdatePagination} />
      </Row>
    </Container>
  )
}

export default BlogList;