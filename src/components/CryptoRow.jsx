import React from "react";

const CryptoRow = ({ crypto }) => {
  return (
    <tr>
      <td>
        <img src={crypto.image} alt={crypto.name} />
        {crypto.name}
      </td>
      <td>{crypto.symbol.toUpperCase()}</td>
      <td>${crypto.current_price.toLocaleString()}</td>
      <td>${crypto.market_cap.toLocaleString()}</td>
      <td
        className={
          crypto.price_change_percentage_24h > 0 ? "price-up" : "price-down"
        }
      >
        {crypto.price_change_percentage_24h.toFixed(2)}%
      </td>
    </tr>
  );
};

export default CryptoRow;
