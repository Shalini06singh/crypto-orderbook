## Crypto-orderbook

The application is a cryptocurrency trading dashboard that displays a real-time orderbook for the BTC-USD pair along with associated market indicators.

It includes features like:

Orderbook Display: Shows 10 levels of the best bids and asks, updated regularly.

Spread Indicator: A live graph displaying the spread between the best bid and ask prices.

Orderbook Imbalance Indicator: A metric to measure the imbalance between buy and sell orders.

Market Depth Chart: A live snapshot of the market depth.

Responsive Design: The application works seamlessly across devices.
## Tech Stack

1.Next.js: Framework for server-side rendering and React-based applications.

2.Chart.js: Library for creating interactive charts and graphs.

3.react-chartjs-2: React wrapper for Chart.js.

4.Binance API: Real-time cryptocurrency data.
## Features

1.app/page.tsx

Acts as the main page of the application.
Integrates components like OrderBook and MarketIndicators.
Provides layout and structure for the dashboard.

2.OrderBook.js:

Displays the real-time orderbook and includes charts for market indicators.
Uses react-chartjs-2 for rendering visualizations like the Spread Indicator and Market Depth Chart.
Fetches live orderbook data from a cryptocurrency exchange API (e.g., Binance, Coinbase).

3.MarketIndicators.js:

Contains the Spread Indicator and Orderbook Imbalance Indicator.
This file is modular and can be extended with additional indicators.

4.Home.module.css:

Styles the dashboard for responsiveness and proper layout.
Ensures the application works across mobile, tablet, and desktop devices.
## Functionality

1.Real-Time Data:

The app fetches real-time data (e.g., orderbook levels, spread, depth) from an API.
Data is updated at regular intervals (e.g., every second).

2.Spread Indicator:

Calculates the spread as the difference between the best bid and ask prices.
Displays this as a live chart over a rolling 1-minute period.

3.Orderbook Imbalance:

Measures the imbalance between buy and sell orders.
Helps traders identify market sentiment.

4.Market Depth Chart:

Provides a snapshot of buy and sell order volumes at different price levels.
Helps users visualize liquidity and potential resistance/support levels.
## Installation

Cloning the Repository
```
git clone https://github.com/your-username/crypto-dashboard.git
```
```
cd crypto-orderbook
```


Installation

Install the project dependencies using npm:
```
npm install
```
Running the Project
```
npm run dev
```
Open http://localhost:3000 in your browser to view the project.
## 🔗 Links


[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shalini06/)



## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with your enhancements.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
