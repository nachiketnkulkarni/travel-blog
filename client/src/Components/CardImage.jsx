import React from "react";

function CardImage(props) {
  return (
    <>
      <div className={`imageContainer ${props.Blog && "col-md-4 no-padding"}`}>
        <img
          src={props.img}
          className={`card-img-top coverImage  ${
            props.Blog && "blog-card-image"
          }`}
          alt={props.blog.title}
        />
      </div>
    </>
  );
}

export default CardImage;
