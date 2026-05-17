import React from "react";

function RightSection({
  imageUrl,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col mt-5 p-5">
          <h1>{productName}</h1>
          <p className="text-muted ">{productDescription}</p>
          <a style={{ textDecoration: "none" }} href={learnMore}>
            {learnMore} →
          </a>
        </div>
        <div className="col ">
          <img src={imageUrl} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
