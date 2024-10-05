import React from "react";
import CryptoRow from "./CryptoRow";

const CryptoTable = ({ cryptos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Market Cap</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.map((crypto) => (
          <CryptoRow key={crypto.id} crypto={crypto} />
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable;
