import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import GeneralContext from "./GeneralContext";
import { holdings as staticHoldings } from "../data/data";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get("http://localhost:3005/allHoldings")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHoldings(res.data);
        } else {
          setHoldings(staticHoldings);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch holdings for summary", err);
        setHoldings(staticHoldings);
      });
  }, [generalContext.renderTrigger]);

  // Calculations
  const totalInvestment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const totalCurrentValue = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const totalPnL = totalCurrentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;
  const isProfit = totalPnL >= 0;

  // Doughnut Chart Data Setup
  const doughnutColors = [
    "rgba(255, 99, 132, 0.75)",
    "rgba(54, 162, 235, 0.75)",
    "rgba(255, 206, 86, 0.75)",
    "rgba(75, 192, 192, 0.75)",
    "rgba(153, 102, 255, 0.75)",
    "rgba(255, 159, 64, 0.75)",
    "rgba(46, 204, 113, 0.75)",
    "rgba(155, 89, 182, 0.75)",
    "rgba(241, 196, 15, 0.75)",
    "rgba(230, 126, 34, 0.75)",
    "rgba(52, 152, 219, 0.75)",
    "rgba(26, 188, 156, 0.75)",
    "rgba(243, 156, 18, 0.75)",
  ];

  const doughnutData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [
      {
        label: "Allocation (INR)",
        data: holdings.map((stock) => stock.price * stock.qty),
        backgroundColor: doughnutColors.slice(0, holdings.length),
        borderColor: "#fff",
        borderWidth: 1.5,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          font: {
            size: 11,
          },
          padding: 8,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const val = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((val / total) * 100).toFixed(1);
            return ` ₹${val.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="summary-dashboard">
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="summary-layout">
        {/* Statistics section */}
        <div className="summary-stats">
          <div className="section">
            <span className="section-title">
              <p>Equity Balance</p>
            </span>
            <div className="data">
              <div className="first">
                <h3>₹1,04,043.10</h3>
                <p>Margin available</p>
              </div>
              <hr className="vertical-divider" />
              <div className="second">
                <p>
                  Margins used <span>₹{totalInvestment.toFixed(2)}</span>
                </p>
                <p>
                  Opening balance <span>₹1,00,000.00</span>
                </p>
              </div>
            </div>
            <hr className="divider" />
          </div>

          <div className="section">
            <span className="section-title">
              <p>Holdings ({holdings.length})</p>
            </span>
            <div className="data">
              <div className="first">
                <h3 className={isProfit ? "profit" : "loss"}>
                  {isProfit ? "+" : ""}{totalPnL.toFixed(2)} <small>({isProfit ? "+" : ""}{pnlPercent.toFixed(2)}%)</small>
                </h3>
                <p>Current P&L</p>
              </div>
              <hr className="vertical-divider" />
              <div className="second">
                <p>
                  Current Value <span>₹{totalCurrentValue.toFixed(2)}</span>
                </p>
                <p>
                  Investment <span>₹{totalInvestment.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <hr className="divider" />
          </div>
        </div>

        {/* Visual Allocation Chart */}
        {holdings.length > 0 && (
          <div className="summary-chart-container">
            <h4 className="chart-title">Portfolio Allocation</h4>
            <div className="doughnut-wrapper">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
