import React from "react";
import BlogSearch from "../../stateful/BlogSearch";

/**
 * @param props : {
 *   getBlogsWithParams : (params) => {},
 *   blogListPage : {
 *     content: [],
 *     number: int,
 *     totalPages: int
 *   }
 *   pageSize : int
 * }
 * @returns {JSX.Element}
 * @constructor
 */
const BlogListPage = (props) => {
  return (
    <BlogSearch pageSize={props.pageSize}
                searchButtonText={"Search Blogs"}/>
  )
}

export default BlogListPage;