'use client';

import OrderBook from "@/components/OrderBook";
import MarketIndicators from "@/components/MarketIndicators";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>BTC-USD Order Book</h1>
      <MarketIndicators />
      <OrderBook />
    </div>
  );
}
