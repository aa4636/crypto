# Crypto Trading Platform

A modern, real-time cryptocurrency trading platform built with React and TypeScript. Features live price tracking, portfolio management, trade execution, and transaction history.

![Crypto Trading Platform](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-green)

## 🚀 Features

### 📊 Real-time Price Tracking
- Live cryptocurrency prices via Binance WebSocket
- Animated price change indicators with color-coded updates
- Real-time updates with visual feedback (green/red indicators)
- Top 15 trading pairs display with percentage changes

### 💱 Trading Interface
- Instant Buy/Sell order execution
- Multiple quantity presets (0.001, 0.01, 0.1, 1)
- Real-time total value calculation
- Responsive trade panel with loading states and animations

### 📈 Portfolio Management
- Real-time portfolio valuation
- Asset allocation breakdown with percentages
- Profit/Loss tracking with visual indicators
- Equity and balance tracking

### 👛 Wallet System
- Available balance display
- Holdings overview with asset icons
- Asset statistics and counts
- Transaction history with filtering

### 📋 Trade History
- Complete transaction log with timestamps
- Filter by trade type (All/Buy/Sell)
- Detailed trade information (price, quantity, total)
- Summary statistics

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
    git clone <repository-url>
    cd crypto-trading-platform
    ```

2. **Install dependencies**
  ```bash
  npm install
  # or
  yarn install
  ```

3. **Start the development server**
  ```bash
  npm start
  # or
  yarn start
  ```

  - Open your browser
  - Navigate to http://localhost:3000

The application will automatically open in your default browser.

### Build for Production
  
  ```bash
  npm run build
  # or
  yarn build
  ```

# 🔧 Configuration

## 🛰️ WebSocket Connection
The application connects to Binance's WebSocket stream for real-time price data:

- **Endpoint:** `wss://stream.binance.com:9443/ws/!ticker@arr`  
- **Data:** Top 15 trading pairs with price and percentage changes  
- **Features:** Automatic reconnection handling and error states  

## 💾 Data Persistence
- Uses browser **localStorage** for data persistence  
- **Wallet balance** and **holdings** are saved locally  
- **Trade history** is maintained across sessions  
- Data survives browser refresh  

---

# 💰 Test Credentials & Demo Data

## 🪙 Initial Wallet State
The application starts with a demo wallet pre-configured:

- **Initial Balance:** `$10,000.00 USD`  
- **Initial Holdings:** Empty portfolio (ready for first trades)  
- **Demo Mode:** All trades are simulated locally with real market prices  

## 📊 Trading Limits
- **Minimum quantity:** `0.0001`  
- **Maximum:** Based on available balance  
- **Real-time price validation**  
- **Balance checks before trade execution**  

---

# 🎯 Usage Guide

## 💵 Making Your First Trade
1. **Wait for prices to load** – The price ticker will show live data once connected (green connection indicator).  
2. **Select a trading pair** – Choose from available cryptocurrencies (BTCUSDT, ETHUSDT, etc.).  
3. **Set quantity** – Use presets or enter a custom amount.  
4. **Execute trade** – Click **BUY** or **SELL** with animated confirmation.  
5. **View results** – Check your portfolio and wallet for updates.  

## 📈 Monitoring Your Portfolio
- **Portfolio Overview:** Total value, equity, and P/L with color-coded indicators.  
- **Asset Allocation:** Visual breakdown of holdings by percentage.  
- **Wallet:** Available balance and asset count with interactive cards.  
- **History:** Complete record of all transactions with filtering options.  

---

# 🎨 UI/UX Features
- Glass morphism design with gradient backgrounds  
- Smooth animations and hover effects throughout  
- Real-time visual feedback for price changes (green/red flashing)  
- Responsive design optimized for all screen sizes  
- Loading states and elegant empty state handling  
- Interactive components with scale transitions  

---

# 🔒 Data & Security
- **Local Storage Only:** All data persists in your browser only  
- **No Real Money:** Demo trading with virtual funds  
- **Real Prices:** Live market data from Binance API  
- **No Authentication Required:** Instant access without signup  
- **Client-Side Only:** No data sent to external servers  

---

# 🚨 Important Notes
- This is a **demo application** for educational and demonstration purposes.  
- No real cryptocurrency is being traded or exchanged.  
- All transactions are simulated locally in your browser.  
- Prices are real-time from Binance but trades don't affect real markets.  
- Refresh the page to reset to the initial state.  

---

# 🐛 Troubleshooting

## Common Issues

### ❌ No Prices Loading
- Check internet connection.  
- Verify WebSocket support in browser.  
- Wait for connection to establish (typically 2–5 seconds).  
- Check browser console for any connection errors.  

### ⚠️ Trades Not Executing
- Ensure prices are fully loaded (no “Loading pairs...” message).  
- Check available balance in wallet.  
- Verify quantity is within minimum/maximum limits.  
- Ensure not in “Processing...” state from previous trade.  

### 🔁 Data Reset
- Clear browser **localStorage** to reset all data to initial state.  
- Refresh page to reinitialize the application.  
- Check if private/incognito mode is affecting persistence.  

---

# 📱 Browser Support
- Chrome / Chromium (recommended, best performance)  
- Firefox (fully supported)  
- Safari (fully supported)  
- Edge (fully supported)  

---

# 🔄 Future Enhancements
- Advanced order types (limit orders, stop-loss)  
- Portfolio performance charts and analytics  
- Multiple wallet support with switching  
- Price alerts and notifications  
- Export trade history to CSV  
- Dark/light theme toggle  
- Mobile app version  


Made with ❤️ using React, TypeScript & Tailwind CSS