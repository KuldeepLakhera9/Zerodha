import React, { useMemo, useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import GeneralContext from "./GeneralContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StockChart = ({ symbol, currentPrice }) => {
  const generalContext = useContext(GeneralContext);

  // Generate mock historical data based on current price
  const chartData = useMemo(() => {
    const dataPoints = 12;
    const labels = [];
    const prices = [];
    
    // Create hourly labels (e.g., 9:15, 10:15...)
    let time = 9;
    let mins = 15;
    for (let i = 0; i < dataPoints; i++) {
      labels.push(`${time}:${mins < 10 ? "0" + mins : mins}`);
      time++;
    }

    // Seed the price generation
    let seedPrice = currentPrice * 0.96; // start a bit lower
    prices.push(seedPrice);

    for (let i = 1; i < dataPoints - 1; i++) {
      // Small random walk with a positive drift to currentPrice
      const targetDrift = (currentPrice - seedPrice) / (dataPoints - i);
      seedPrice = seedPrice + targetDrift + (Math.random() - 0.45) * (currentPrice * 0.015);
      prices.push(Number(seedPrice.toFixed(2)));
    }
    
    // Ensure the last point is exactly the current LTP
    prices.push(currentPrice);

    return { labels, prices };
  }, [symbol, currentPrice]);

  const maxPrice = Math.max(...chartData.prices);
  const minPrice = Math.min(...chartData.prices);
  const priceDiff = currentPrice - chartData.prices[0];
  const percentDiff = ((priceDiff / chartData.prices[0]) * 100).toFixed(2);
  const isUp = priceDiff >= 0;

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        fill: true,
        label: `${symbol} Price (INR)`,
        data: chartData.prices,
        borderColor: isUp ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          if (isUp) {
            gradient.addColorStop(0, "rgba(75, 192, 192, 0.4)");
            gradient.addColorStop(1, "rgba(75, 192, 192, 0.0)");
          } else {
            gradient.addColorStop(0, "rgba(255, 99, 132, 0.4)");
            gradient.addColorStop(1, "rgba(255, 99, 132, 0.0)");
          }
          return gradient;
        },
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: isUp ? "#4bc0c0" : "#ff6384",
        pointBorderColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1f1f1f",
        titleColor: "#999",
        bodyColor: "#fff",
        borderColor: "#333",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context) => ` ₹${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#999",
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.08)",
        },
        ticks: {
          color: "#999",
          font: {
            size: 10,
          },
          callback: (value) => `₹${value.toFixed(0)}`,
        },
      },
    },
  };

  return (
    <div className="chart-overlay">
      <div className="chart-modal-container">
        <div className="chart-modal-header">
          <div>
            <h3>{symbol} Analytics</h3>
            <p className="exchange-tag">NSE Stock Trend Today</p>
          </div>
          <button className="btn-close-chart" onClick={generalContext.closeAnalytics}>
            &times;
          </button>
        </div>

        <div className="stock-summary-cards">
          <div className="summary-card">
            <span className="label">LTP (Last Traded Price)</span>
            <span className="value font-medium">₹{currentPrice.toFixed(2)}</span>
          </div>
          <div className="summary-card">
            <span className="label">Day's Change</span>
            <span className={`value font-medium ${isUp ? "up" : "down"}`}>
              {isUp ? "+" : ""}{priceDiff.toFixed(2)} ({isUp ? "+" : ""}{percentDiff}%)
            </span>
          </div>
          <div className="summary-card">
            <span className="label">High</span>
            <span className="value">₹{maxPrice.toFixed(2)}</span>
          </div>
          <div className="summary-card">
            <span className="label">Low</span>
            <span className="value">₹{minPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="chart-wrapper">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StockChart;
