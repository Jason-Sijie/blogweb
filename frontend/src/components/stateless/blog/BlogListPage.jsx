import React from "react";
import { useLocation } from "react-router-dom";
import BlogSearch from "../../stateful/blog/BlogSearch";

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
    <div style={{padding: "0 10%"}}>
      <BlogSearch pageSize={props.pageSize}
                tagNames={tagNames}
                viewsSort="DESC"
                searchButtonText={props.searchButtonText}
                title={props.title} />
    </div>
  )
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default BlogListPage;