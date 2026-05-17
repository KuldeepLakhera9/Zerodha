import React from "react";

function LeftSecion({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col p-5">
          <img src={imageUrl} />
        </div>
        <div className="col mt-5 p-5">
          <h1>{productName}</h1>
          <p className="text-muted ">{productDescription}</p>
          <div>
            <a style={{ textDecoration: "none" }} href={tryDemo}>
              Try Demo →
            </a>
            <a
              style={{ marginLeft: "100px", textDecoration: "none" }}
              href={learnMore}
            >
              Learn More →
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a style={{ marginLeft: "50px" }} href={appStore}>
              <img src="media/images/appstoreBadge.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSecion;
