import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5  border-top">
        <div className="col-8 p-4">
          <a className="text-center" style={{ textDecoration: "none" }} href="">
            <h1 className="fs-3">Brokerage Calculator</h1>
          </a>
          <div className="text-muted" style={{ lineHeight: "2" }}>
            <ul>
              <li>
                Call & Trade and RMS auto-squareoff: Additional charges of 750 +
                GST per order.
              </li>
              <li>Digital contract notes will be sent via e-mail.</li>
              <li>
                Physical copies of contract notes, if required, shall be charged
                $20 per contract note. Courier charges apply.
              </li>
              <li>
                For NRI account (non-PIS), 0.5% or 100% executed order for
                equity (whichever is lower).
              </li>
              <li>
                For NRI account (PIS), 0.5% or 7200 per executed order for
                equity (whichever is
              </li>
              <li>
                If the account is in debit balance, any order placed will be
                charged F40 per executed order instead of 720 per executed
                order.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-4 p-4">
          <a style={{ textDecoration: "none" }} href="">
            <h1 className="fs-3">List of charges</h1>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
