'use client'
import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend,
  } from "chart.js";
import { Line } from "react-chartjs-2";
  
  // Register components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend
  );
  
export default function OrderBook() {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [spreadHistory, setSpreadHistory] = useState([]);
  const [imbalance, setImbalance] = useState(0);
  const [depthData, setDepthData] = useState({ bids: [], asks: [] });


  useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

    ws.onopen = () => {
      const subscribeMessage = {
        type: "subscribe",
        product_ids: ["BTC-USD"],
        channels: ["level2"],
      };
      ws.send(JSON.stringify(subscribeMessage));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "snapshot") {
        // Initialize the orderbook with the snapshot data
        setBids(formatOrders(data.bids));
        setAsks(formatOrders(data.asks));
      }
    else  if (data.type === "l2update") {
        // Update the orderbook with the changes
        updateOrderBook(data.changes);
      }
      updateIndicators();
    };


    return () => ws.close(); // Cleanup on component unmount
  }, []);
    const formatOrders = (orders) => {
    return orders
      .map(([price, size]) => ({ price: parseFloat(price), size: parseFloat(size) }))
      .sort((a, b) => b.price - a.price); // Sort bids in descending order
  };

const updateOrderBook = (changes) => {
    changes.forEach(([side, price, size]) => {
      const priceFloat = parseFloat(price);
      const sizeFloat = parseFloat(size);

      if (side === "buy") {
        setBids((prevBids) => updateLevel(prevBids, priceFloat, sizeFloat));
      } else {
        setAsks((prevAsks) => updateLevel(prevAsks, priceFloat, sizeFloat));
      }
    });
  };
  const updateLevel = (orders, price, size) => {
    const index = orders.findIndex((order) => order.price === price);

    if (size === 0) {
      // Remove order if size is 0
      if (index !== -1) orders.splice(index, 1);
    } else {
      // Update or add the order
      if (index !== -1) {
        orders[index].size = size;
      } else {
        orders.push({ price, size });
      }
    }
    return [...orders].sort((a, b) => (bids.includes(orders[0]) ? b.price - a.price : a.price - b.price)); // Sort
  };

  const updateIndicators = () => {
    if (bids.length > 0 && asks.length > 0) {
      // Spread Indicator
      const spread = asks[0].price - bids[0].price;
      setSpreadHistory((prev) => [...prev.slice(-59), spread]);

      // Orderbook Imbalance
      const totalBids = bids.reduce((acc, bid) => acc + bid.size, 0);
      const totalAsks = asks.reduce((acc, ask) => acc + ask.size, 0);
      const imbalance = (totalBids - totalAsks) / (totalBids + totalAsks);
      setImbalance(imbalance);


         // Market Depth
      setDepthData({
        bids: bids.map((bid, index) => ({
          price: bid.price,
          size: bids.slice(0, index + 1).reduce((acc, item) => acc + item.size, 0),
        })),
        asks: asks.map((ask, index) => ({
          price: ask.price,
          size: asks.slice(0, index + 1).reduce((acc, item) => acc + item.size, 0),
        })),
      });
    }
  };
  const spreadChartData = {
    labels: Array(spreadHistory.length).fill(""),
    datasets: [
      {
        label: "Spread (USD)",
        data: spreadHistory,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };


  return (
<div>
      <h2>BTC-USD Order Book</h2>

      {/* Spread Indicator */}
      <div>
        <h3>Spread Indicator</h3>
        <Line data={spreadChartData} />
      </div>
      {/* Orderbook Imbalance */}
      <div>
        <h3>Orderbook Imbalance</h3>
        <p>{imbalance.toFixed(4)}</p>
      </div>

     {/* Market Depth */}
     <div>
        <h3>Market Depth Chart</h3>
        <Line
          data={{
            labels: [...depthData.bids.map((d) => d.price), ...depthData.asks.map((d) => d.price)],
            datasets: [
              {
                label: "Bids",
                data: depthData.bids.map((d) => d.size),
                borderColor: "green",
                fill: false,
              },
              {
                label: "Asks",
                data: depthData.asks.map((d) => d.size),
                borderColor: "red",
                fill: false,
              },
            ],
          }}
        />
      </div>

     {/* Order Book */}
     <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>Bids</h3>
          {bids.slice(0, 10).map((bid, index) => (
            <p key={index}>
              <span style={{ color: "green" }}>{bid.price.toFixed(2)}</span> - {bid.size.toFixed(4)}
            </p>
          ))}
        </div>
        <div>
          <h3>Asks</h3>
          {asks.slice(0, 10).map((ask, index) => (
            <p key={index}>
            <span style={{ color: "red" }}>{ask.price.toFixed(2)}</span> - {ask.size.toFixed(4)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
