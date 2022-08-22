import React from "react";
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
  return (
    <BlogSearch pageSize={props.pageSize}
                searchButtonText={props.searchButtonText}
                title={props.title} />
  )
}

export default BlogListPage;