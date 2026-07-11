import React, { useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import GeneralContext from "./GeneralContext";
import BuyWindow from "./BuyWindow";
import StockChart from "./StockChart";

const Home = () => {
  const [buyWindow, setBuyWindow] = useState({
    isOpen: false,
    symbol: "",
    mode: "BUY",
    price: 0,
  });

  const [analyticsModal, setAnalyticsModal] = useState({
    isOpen: false,
    symbol: "",
    price: 0,
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", // success | error | info
  });

  const [renderTrigger, setRenderTrigger] = useState(0);

  const openBuyWindow = (symbol, mode = "BUY", price = 0) => {
    setBuyWindow({
      isOpen: true,
      symbol,
      mode,
      price,
    });
  };

  const closeBuyWindow = () => {
    setBuyWindow((prev) => ({ ...prev, isOpen: false }));
  };

  const openAnalytics = (symbol, price = 0) => {
    setAnalyticsModal({
      isOpen: true,
      symbol,
      price,
    });
  };

  const closeAnalytics = () => {
    setAnalyticsModal((prev) => ({ ...prev, isOpen: false }));
  };

  const triggerRefresh = () => {
    setRenderTrigger((prev) => prev + 1);
  };

  const showNotification = (message, type = "success") => {
    setNotification({
      show: true,
      message,
      type,
    });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const contextValue = {
    openBuyWindow,
    closeBuyWindow,
    openAnalytics,
    closeAnalytics,
    showNotification,
    renderTrigger,
    triggerRefresh,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      <TopBar />
      <Dashboard />
      
      {/* Order placement window */}
      {buyWindow.isOpen && (
        <BuyWindow
          symbol={buyWindow.symbol}
          mode={buyWindow.mode}
          price={buyWindow.price}
        />
      )}

      {/* Stock chart window */}
      {analyticsModal.isOpen && (
        <StockChart
          symbol={analyticsModal.symbol}
          currentPrice={analyticsModal.price}
        />
      )}

      {/* Floating notifications toast */}
      {notification.show && (
        <div className={`toast-notification ${notification.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {notification.type === "success" ? "✓" : notification.type === "error" ? "✗" : "ℹ"}
            </span>
            <span className="toast-message">{notification.message}</span>
          </div>
          <button
            className="toast-close"
            onClick={() => setNotification((prev) => ({ ...prev, show: false }))}
          >
            &times;
          </button>
        </div>
      )}
    </GeneralContext.Provider>
  );
};

export default Home;
