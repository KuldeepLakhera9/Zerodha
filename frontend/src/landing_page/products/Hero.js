import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center p-5 mt-5">
        <h1 className="fs-2">Zerodha Products</h1>
        <h3 className="text-muted fs-4 mt-3">
          Sleek, modern, and intuitive trading platforms
        </h3>
        <p className="text-muted fs-5 mt-4">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none" }}>
            investment offerings →
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
