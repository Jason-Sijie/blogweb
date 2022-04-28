import React from "react";
import BlogSearch from "../../stateful/BlogSearch";

const BlogListPage = (props) => {
  return (
    <BlogSearch getBlogsWithPageAndSize={props.action.blog.getBlogsWithPageAndSize}
                blogListPage={props.blog.blogListPage} />
  )
}

export default BlogListPage;