// src/App.tsx
import React, { useState } from "react";
import { PriceTicker } from "./components/PriceTicker";
import { TradePanel } from "./components/TradePanel";
import { TradeHistory } from "./components/TradeHistory";
import { Wallet } from "./components/Wallet";
import { Portfolio } from "./components/Portfolio";

const App: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [refresh, setRefresh] = useState(false);

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="container px-10 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-400 text-transparent bg-clip-text">
                Crypto Trading
              </h1>
            </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
          </div>
        </div>
      </header>

      <PriceTicker onPriceUpdate={setPrices} />
      <TradePanel prices={prices} onTrade={() => setRefresh(!refresh)} />
      <Wallet />
      <Portfolio prices={prices} />
      <TradeHistory />
    </div>
  );
};

export default App;
