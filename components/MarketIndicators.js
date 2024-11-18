'use client'

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function MarketIndicators() {
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
       
      );
      const data = await res.json();
      const price = data.bitcoin.usd;
      setPrices((prev) => [...prev, price]);
      setTimestamps((prev) => [...prev, new Date().toLocaleTimeString()]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "BTC-USD Price",
        data: prices,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Market Indicators</h2>
      <Line data={data} />
    </div>
  );
}
