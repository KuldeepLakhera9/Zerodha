import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img src="media/images/largestBroker.svg" alt="Broker" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>Largest Stock Broker in India</h1>
          <p className="mb-5">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futuers and options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <li>
                <p>Stocks & IPOs</p>
              </li>
              <li>
                <p>Direct mutual funds</p>
              </li>
              <li>
                <p>Bonds & Govt securities</p>
              </li>
            </div>
          </div>
          <img
            src="media/images/pressLogos.png"
            alt="img"
            style={{ width: "90%" }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Awards;
