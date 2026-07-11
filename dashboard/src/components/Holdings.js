import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { holdings as staticHoldings } from "../data/data";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3005/allHoldings")
      .then((res) => {
        // If seeded data is returned, set it
        if (res.data && res.data.length > 0) {
          setHoldings(res.data);
        } else {
          // If database is connected but empty, seed first or use static holdings
          setHoldings(staticHoldings);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch holdings, falling back to static data", err);
        setHoldings(staticHoldings);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [generalContext.renderTrigger]);

  // Compute portfolio statistics dynamically
  const totalInvestment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const totalCurrentValue = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isTotalProfit = totalPnL >= 0;

  if (isLoading) {
    return <div className="loading">Loading holdings...</div>;
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const stockPnL = curValue - stock.avg * stock.qty;
              const isProfit = stockPnL >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              
              // Handle day change styling
              const isDayLoss = stock.day ? stock.day.startsWith("-") : stock.isLoss;
              const dayChangeClass = isDayLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{stockPnL.toFixed(2)}</td>
                  <td className={profClass}>{stock.net || "0.00%"}</td>
                  <td className={dayChangeClass}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={isTotalProfit ? "profit" : "loss"}>
            {totalPnL.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({isTotalProfit ? "+" : ""}{pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
