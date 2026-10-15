import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HistoricalChart from "./HistoricalChart";
import GeneralContext from "../../contexts/GeneralContext";
import "./StockDetails.css";

const StockDetails = () => {
  
  const { symbol } = useParams();

  const { marketStocks } = useContext(GeneralContext);

  const stock = marketStocks.find((item) => item.symbol === symbol);


  const [period, setPeriod] = useState("1yr");
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyLoading, setCompanyLoading] = useState(true);
  const [company, setCompany] = useState(null);


useEffect(() => {
  const fetchCompanyInfo = async () => {
    try {
      setCompany(null);
      const response = await axios.get(
        `http://localhost:3002/market/company/${symbol}`,
      );

      setCompany(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch company information:",
        error.response?.data || error.message,
      );
      setCompany(null);
    } finally {
      setCompanyLoading(false);
    }
  };

  fetchCompanyInfo();
}, [symbol]);


  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);

        // these lines will be used to  

        // const response = await axios.get(
        //   `http://localhost:3002/market/history/${symbol}?period=${period}`,
        // );

        setHistoricalData(null);
      } catch (error) {
        console.error(
          "Failed to fetch historical data:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [symbol, period]);

  if (!stock) {
    return <p>Stock not found.</p>;
  }
  return (
    <div>
      <h2>{stock.name}</h2>
      <p>₹{Number(stock.currentPrice).toFixed(2)}</p>
      <p>
        {stock.symbol} · {stock.exchange}
      </p>

      {companyLoading ? (
        <p>Loading company information...</p>
      ) : company ? (
        <section className="company-information">
          <h3>About {stock.name}</h3>
          <p>{company.overview}</p>
          <div>
            <strong>Sector:</strong> {company.sector}
          </div>
          <div>
            <strong>Industry:</strong> {company.industry}
          </div>
        </section>
      ) : (
        <p>Company information is currently unavailable.</p>
      )}

      <div className="period-buttons">
        {["1m", "6m", "1yr", "3yr", "5yr", "max"].map((item) => (
          <button
            key={item}
            onClick={() => setPeriod(item)}
            className={period === item ? "active" : ""}
          >
            {item === "1m"
              ? "1M"
              : item === "6m"
                ? "6M"
                : item === "1yr"
                  ? "1Y"
                  : item === "3yr"
                    ? "3Y"
                    : item === "5yr"
                      ? "5Y"
                      : "MAX"}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading historical data...</p>
      ) : (
        <HistoricalChart data={historicalData} />
      )}
    </div>
  );
};

export default StockDetails;
