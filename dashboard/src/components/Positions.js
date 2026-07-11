import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { positions as staticPositions } from "../data/data";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3005/allPositions")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPositions(res.data);
        } else {
          setPositions(staticPositions);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch positions, falling back to static data", err);
        setPositions(staticPositions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [generalContext.renderTrigger]);

  if (isLoading) {
    return <div className="loading">Loading positions...</div>;
  }

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const stockPnL = curValue - stock.avg * stock.qty;
              const isProfit = stockPnL >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              
              const isDayLoss = stock.day ? stock.day.startsWith("-") : stock.isLoss;
              const dayClass = isDayLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td className={profClass}>{stockPnL.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day || "0.00%"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
