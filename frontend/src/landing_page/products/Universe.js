import React from "react";

function Universe() {
  return (
    <div className="container p-5">
      <div className="row text-center mt-4">
        <h1 className="fs-3">The Zerodha Universe</h1>
        <p className="mb-5">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        <div className="col p-3 ">
          <img src="media/images/smallCaseLogo.png" />
          <p className=" text-muted">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col p-3">
          <img
            src="media/images/sensibullLogo.svg"
            style={{ width: "65%", marginBottom: "8px" }}
          />
          <p className=" text-muted">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col p-3">
          <img src="media/images/tijori.svg" style={{ width: "40%" }} />
          <p className=" text-muted">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="row">
          <div className="col p-3">
            <img src="media/images/streakLogo.png" style={{ width: "40%" }} />
            <p className=" text-muted">
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs.
            </p>
          </div>
          <div className="col p-3">
            <img
              src="media/images/zerodhaFundhouse.png"
              style={{ width: "60%" }}
            />
            <p className=" text-muted">
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs.
            </p>
          </div>
          <div className="col p-3">
            <img src="media/images/dittoLogo.png" style={{ width: "40%" }} />
            <p className=" text-muted">
              Thematic investing platform that helps you invest in diversified
              baskets of stocks on ETFs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Universe;
