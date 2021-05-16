// reference: https://bit.dev/orderdesk/prototype/blog-item/~code#index.js
import "./style.scss";

// BlogItem only displays the following fields in `props.blog`
//
// props.blog = {
//   imgSrc: "",
//   tags: [
//     {
//       name: "",
//       bgColor: ""  (optional)
//     }
//    ... ],
//   date: "",
//   title: "",
//   text: "",
//   url: ""
// }

// default color for tags
const colorsInHex = [
  "#bada55",
  "#FC6042",
  "#0ff1ce",
  "#7fe5f0",
  "#ffc0cb",
  "#ffd700",
  "#d3ffce",
  "#fcb941",
]

const TagList = (props) => {
  return (
    <div className="blog-item__type-container">
        {
        props.tags?.length && props.tags.map((type,index)=>(
          <div key={index.toString()} className="chip" style={{
            backgroundColor: type.bgColor? type.bgColor : colorsInHex[index]
          }} >
            <span> { type.name } </span>
          </div>
        ))
        }
    </div>
  );
}

const BlogItem = (props) => {
  return ( 
    <div className="blog-item__container">
      <div className="blog-item__inner">
        <div className="blog-item__image-container">
          <img src={props.blog.imgSrc}/>
        </div>

        <div className="blog-item__content">
          <h2 className="blog-item__title">{props.blog.title}</h2>
          <p className="blog-item__text">
            {props.blog.text}
          </p>
          <TagList tags={props.blog.tags} />

          <div className="blog-item__bottom-container">
            <span className="blog-item__date">{props.blog.date}</span>
            <div className="blog-item__read-more__container">
              <a href={props.blog.url} className="read-more">
                READ MORE
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
   );
}
 
export default BlogItem;