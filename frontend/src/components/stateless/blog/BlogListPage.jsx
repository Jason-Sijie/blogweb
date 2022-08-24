import React from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BlogSearch from "../../stateful/blog/BlogSearch";
import TopTags from "../../stateful/tag/TopTags";

/**
 * @param props : {
 *   pageSize : int,
 *   searchButtonText : "",
 *   title : "" (optional)
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const BlogListPage = (props) => {
  let query = useQuery();
  const tagNamesString = query.get("tagNames");
  let tagNames = []
  if (tagNamesString != null && tagNamesString !== "") {
    tagNames = tagNamesString.split(",")
  }

  return (
    <Row style={{padding: "0", justifyContent: "center"}}>
      <Col xs="7" style={{padding: "0 2%"}}>
        <BlogSearch pageSize={props.pageSize}
                  tagNames={tagNames}
                  viewsSort="DESC"
                  searchButtonText={props.searchButtonText}
                  title={props.title} />
      </Col>
      <Col xs="3" style={{padding: "2% 0 2% 2%"}}>
        <Row className="shadow bg-white rounded" style={{margin: "10% 0"}}>
          <TopTags topK={10} border="secondary"
                  type="size" color="secondary"
                  header={"Top 10 Sized Tags"}/>
        </Row>
        <Row className="shadow bg-white rounded" style={{margin: "10% 0"}}>
          <TopTags topK={10} border="success"
                  type="view" color="success"
                  header={"Top 10 Viewed Tags"}/>
        </Row>
        <Row className="shadow bg-white rounded" style={{margin: "10% 0"}}>
          <TopTags topK={10} border="info"
                  type="like" color="info"
                  header={"Top 10 Liked Tags"}/>
        </Row>
      </Col>
    </Row>
  )
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default BlogListPage;