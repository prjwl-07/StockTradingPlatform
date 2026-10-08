import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const HoldingsContext = React.createContext({
  holdings: [],
  holdingsLoading: true,
  totalInvestment: 0,
  currentValue: 0,
  totalPnL: 0,
  pnlPercent: 0,
  chartData: { labels: [], datasets: [] },
});

export const HoldingsContextProvider = ({ children }) => {
  const { holdingsRefresh, marketPrices } = useContext(GeneralContext);
  const [savedHoldings, setSavedHoldings] = useState([]);
  const [holdingsLoading, setHoldingsLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      setHoldingsLoading(true);

      try {
        const response = await axios.get("http://localhost:3002/allHoldings", {
          withCredentials: true,
        });
        setSavedHoldings(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch holdings:",
          error.response?.data || error.message,
        );
        setSavedHoldings([]);
      } finally {
        setHoldingsLoading(false);
      }
    };

    fetchHoldings();
  }, [holdingsRefresh]);

  const holdings = savedHoldings.map((stock) => {
    const marketData = marketPrices[stock.name];
    const currentPrice = marketData?.currentPrice ?? stock.price;
    const investedValue = stock.avg * stock.qty;
    const currentValue = currentPrice * stock.qty;
    const pnl = currentValue - investedValue;

    return {
      ...stock,
      currentPrice,
      investedValue,
      currentValue,
      pnl,
      netChange:
        stock.avg > 0 ? ((currentPrice - stock.avg) / stock.avg) * 100 : 0,
      dayChange: marketData?.changePercent ?? 0,
      isProfit: pnl >= 0,
    };
  });

  const totalInvestment = holdings.reduce(
    (total, stock) => total + stock.investedValue,
    0,
  );
  const currentValue = holdings.reduce(
    (total, stock) => total + stock.currentValue,
    0,
  );
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const chartData = {
    labels: holdings.map((stock) => stock.name),
    datasets: [
      {
        label: "Current Value (₹)",
        data: holdings.map((stock) => stock.currentValue),
        backgroundColor: "rgba(37, 99, 235, 0.75)",
        borderColor: "#2563EB",
        borderRadius: 6,
      },
    ],
  };

  return (
    <HoldingsContext.Provider
      value={{
        holdings,
        holdingsLoading,
        totalInvestment,
        currentValue,
        totalPnL,
        pnlPercent,
        chartData,
      }}
    >
      {children}
    </HoldingsContext.Provider>
  );
};

export default HoldingsContext;