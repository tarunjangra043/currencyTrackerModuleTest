import React, { useState, useEffect } from "react";
import CryptoTable from "./components/CryptoTable";
import "./App.css";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [sortByMarketCap, setSortByMarketCap] = useState(null);
  const [sortByPercentage, setSortByPercentage] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleSortByMarketCap = () => {
    const sortedCryptos = [...filteredCryptos];
    if (sortByMarketCap === null || sortByMarketCap === false) {
      sortedCryptos.sort((a, b) => a.market_cap - b.market_cap);
      setSortByMarketCap(true);
    } else {
      sortedCryptos.sort((a, b) => b.market_cap - a.market_cap);
      setSortByMarketCap(false);
    }
    setSortByPercentage(null);
    setCryptos(sortedCryptos);
  };

  const handleSortByPercentage = () => {
    const sortedCryptos = [...filteredCryptos];
    if (sortByPercentage === null || sortByPercentage === false) {
      sortedCryptos.sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
      );
      setSortByPercentage(true);
    } else {
      sortedCryptos.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
      setSortByPercentage(false);
    }
    setSortByMarketCap(null);
    setCryptos(sortedCryptos);
  };

  return (
    <div className="App">
      <h1>Crypto Tracker</h1>
      <input
        type="text"
        placeholder="Search By Name or Symbol"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSortByMarketCap}>
        Sort By Mkt Cap {sortByMarketCap ? "↑" : "↓"}
      </button>
      <button onClick={handleSortByPercentage}>
        Sort By Percentage {sortByPercentage ? "↑" : "↓"}
      </button>

      <CryptoTable cryptos={filteredCryptos} />
    </div>
  );
};

export default App;
