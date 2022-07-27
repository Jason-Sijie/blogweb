import {Container, Row} from "react-bootstrap";
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

      <Row>
        <Pages currentPage={props.currentPage}
               totalPages={props.totalPages || 10}
               pageSize={props.pageSize}
               leftNum={3}
               rightNum={3}
               getPageContentAndUpdatePagination={getPageContentAndUpdatePagination} />
      </Row>
    </Container>
  )

}

export default BlogList;