import {Pagination} from "react-bootstrap";

/**
 * props: {
 *   currentPage: int,
 *   totalPages: int,
 *   leftNum: int,        // number of pages to display left to the current page
 *   rightNum: int,       // number of pages to display right to the current page
 *   pageSize: int,
 *   getPageContentAndUpdatePagination: (page, size) => {},
 * }
 */
const Pages = (props) => {
  const left = Math.max(0, props.currentPage - props.leftNum);
  const right = Math.max(Math.min(props.totalPages - 1, props.currentPage + props.rightNum), 0);
  console.log("right:", right, "left:", left)
  const pageArray = [...Array(right - left + 1).keys()].map((x) => x + left);

  const clickAction = (pageNum) => {
    props.getPageContentAndUpdatePagination(pageNum, props.pageSize);
  }

  return (
    <Pagination style={{justifyContent: "center"}}>
      <Pagination.First onClick={() => {clickAction(0)}}/>
      <Pagination.Prev onClick={() => {clickAction(Math.max(0, props.currentPage-1))}}/>
      {(pageArray[0] > 0) ? <Pagination.Ellipsis disabled /> : <></>}

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

      {(pageArray[pageArray.length - 1] < props.totalPages-1) ? <Pagination.Ellipsis disabled /> : <></>}
      <Pagination.Next onClick={() => clickAction(Math.min(props.currentPage+1, Math.max(props.totalPages-1, 0)))}/>
      <Pagination.Last onClick={() => clickAction(Math.max(props.totalPages-1, 0))}/>
    </Pagination>
  );
};

export default Pages;