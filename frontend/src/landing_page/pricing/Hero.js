import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row text-center p-5 mt-5 border-bottom">
        <h1 className="fs-2">Charges</h1>
        <h3 className="text-muted fs-4 mt-3">List of all charges and taxes</h3>
      </div>
      <div className="row text-center p-5 mt-5">
        <div className="col">
          <img
            src="media/images/pricing0.svg"
            className="text-center p-5 "
            style={{ width: "85%", marginLeft: "30px" }}
          />
          <h1 className="fs-2 text-center">Free equity delivery</h1>
          <h3
            className="text-muted text-center mt-3"
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              lineHeight: "1.6",
            }}
          >
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </h3>
        </div>
        <div className="col">
          {" "}
          <img
            src="media/images/intradayTrades.svg"
            className="text-center p-5"
            style={{ width: "85%", marginLeft: "30px" }}
          />
          <h1 className="fs-2 text-center">Intraday and F&O trades</h1>
          <h3
            className="text-muted text-center mt-3"
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              lineHeight: "1.6",
            }}
          >
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </h3>
        </div>
        <div className="col">
          {" "}
          <img
            src="media/images/pricing0.svg"
            className="text-center p-5"
            style={{ width: "85%", marginLeft: "30px" }}
          />
          <h1 className="fs-2 text-center">ChFree direct MFarges</h1>
          <h3
            className="text-muted text-center mt-3"
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              lineHeight: "1.6",
            }}
          >
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Hero;
