import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const BuyWindow = ({ symbol, mode, price: initialPrice }) => {
  const generalContext = useContext(GeneralContext);
  
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(initialPrice || 0);
  const [productType, setProductType] = useState("CNC"); // CNC or MIS
  const [orderType, setOrderType] = useState("LIMIT"); // LIMIT or MARKET
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialPrice) {
      setPrice(initialPrice);
    }
  }, [initialPrice, symbol]);

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === "MARKET") {
      setPrice(initialPrice);
    }
  };

  const handleExecute = async () => {
    if (qty <= 0) {
      generalContext.showNotification("Quantity must be greater than 0", "error");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3005/newOrder", {
        name: symbol,
        qty: Number(qty),
        price: orderType === "MARKET" ? Number(initialPrice) : Number(price),
        mode: mode.toUpperCase(),
      });

      if (response.status === 201) {
        generalContext.showNotification(
          `Successfully placed ${mode.toUpperCase()} order for ${qty} shares of ${symbol}!`,
          "success"
        );
        generalContext.triggerRefresh();
        generalContext.closeBuyWindow();
      }
    } catch (error) {
      console.error("Order failed:", error);
      generalContext.showNotification(
        error.response?.data || "Failed to place order. Ensure backend is running.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const marginRequired = (qty * (orderType === "MARKET" ? initialPrice : price)).toFixed(2);

  return (
    <div className="buy-window-overlay">
      <div className={`buy-window-container ${mode.toLowerCase()}`}>
        {/* Header */}
        <div className="buy-window-header">
          <div className="title">
            <span className={`badge ${mode.toLowerCase()}`}>{mode.toUpperCase()}</span>
            <h4>{symbol}</h4>
            <span className="exchange">NSE</span>
          </div>
          <div className="ltp">
            LTP: <span>₹{initialPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Product Type Options */}
        <div className="product-type-row">
          <label className={`radio-label ${productType === "CNC" ? "active" : ""}`}>
            <input
              type="radio"
              name="productType"
              value="CNC"
              checked={productType === "CNC"}
              onChange={() => setProductType("CNC")}
            />
            <span>CNC <span>Longterm (delivery)</span></span>
          </label>
          <label className={`radio-label ${productType === "MIS" ? "active" : ""}`}>
            <input
              type="radio"
              name="productType"
              value="MIS"
              checked={productType === "MIS"}
              onChange={() => setProductType("MIS")}
            />
            <span>MIS <span>Intraday (square-off)</span></span>
          </label>
        </div>

        {/* Quantity & Price Inputs */}
        <div className="inputs-row">
          <div className="input-group">
            <label htmlFor="qty">Qty</label>
            <input
              type="number"
              id="qty"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              step="0.05"
              disabled={orderType === "MARKET"}
              value={price}
              onChange={(e) => setPrice(Math.max(0.05, parseFloat(e.target.value) || 0))}
            />
          </div>
        </div>

        {/* Order Type Toggle */}
        <div className="order-type-row">
          <button
            type="button"
            className={`btn-toggle ${orderType === "MARKET" ? "active" : ""}`}
            onClick={() => handleOrderTypeChange("MARKET")}
          >
            Market
          </button>
          <button
            type="button"
            className={`btn-toggle ${orderType === "LIMIT" ? "active" : ""}`}
            onClick={() => handleOrderTypeChange("LIMIT")}
          >
            Limit
          </button>
        </div>

        {/* Footer info & Actions */}
        <div className="buy-window-footer">
          <div className="margin-info">
            <p>Margin required:</p>
            <h3>₹{marginRequired}</h3>
          </div>
          <div className="actions">
            <button
              className={`btn btn-action ${mode.toLowerCase()}`}
              onClick={handleExecute}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : mode.toUpperCase()}
            </button>
            <button className="btn btn-cancel" onClick={generalContext.closeBuyWindow}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyWindow;
