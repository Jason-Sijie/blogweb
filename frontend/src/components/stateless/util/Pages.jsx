import {Pagination} from "react-bootstrap";

/**
 * props: {
 *   currentPage: ,
 *   totalPages: ,
 *   leftNum: ,
 *   rightNum: ,
 *   pageSize: ,
 *   getContentWithPageAndSize: ,
 *   updatePagination: ,
 * }
 */
const Pages = (props) => {
  const left = Math.max(0, props.currentPage - props.leftNum);
  const right = Math.min(props.totalPages - 1, props.currentPage + props.rightNum);
  const pageArray = [...Array(right - left + 1).keys()].map((x) => x + left);

  const clickAction = (pageNum) => {
    props.getContentWithPageAndSize({
      page: pageNum,
      size: props.pageSize
    });
    props.updatePagination(pageNum);
  }

  return (
    <Pagination style={{justifyContent: "center"}}>
      <Pagination.First onClick={() => {clickAction(0)}}/>
      <Pagination.Prev onClick={() => {clickAction(Math.max(0, props.currentPage-1))}}/>
      <Pagination.Ellipsis disabled />

      {pageArray.map((num) => {
        if (num === props.currentPage) {
          return (
            <Pagination.Item key={num} active>{num}</Pagination.Item>
          )
        } else {
          return (
            <Pagination.Item key={num} onClick={() => clickAction(num)}>{num}</Pagination.Item>
          )
        }
      })}

      <Pagination.Ellipsis disabled />
      <Pagination.Next onClick={() => clickAction(Math.min(props.currentPage+1, props.totalPages-1))}/>
      <Pagination.Last onClick={() => clickAction(props.totalPages-1)}/>
    </Pagination>
  );
};

export default Pages;