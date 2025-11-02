// src/components/TradePanel.tsx
import React, { useState, useEffect } from "react";
import { addTrade } from "../utils/storage";

interface Props {
  prices: Record<string, number>;
  onTrade: () => void;
}

export const TradePanel: React.FC<Props> = ({ prices, onTrade }) => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [quantity, setQuantity] = useState(0.001);
  const [isTrading, setIsTrading] = useState(false);
  const [availableSymbols, setAvailableSymbols] = useState<string[]>([]);

  
  useEffect(() => {
    const symbols = Object.keys(prices);
    if (symbols.length > 0) {
      setAvailableSymbols(symbols);
      
      if (!symbols.includes(symbol)) {
        setSymbol(symbols[0]);
      }
    }
  }, [prices, symbol]);

  const executeTrade = async (type: "BUY" | "SELL") => {
    const price = prices[symbol];
    if (!price) {
      alert("No price available for selected symbol!");
      return;
    }

    setIsTrading(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addTrade({
      symbol,
      type,
      price,
      quantity,
      timestamp: new Date().toLocaleTimeString(),
    });

    onTrade();
    setIsTrading(false);
    
    // Reset form after successful trade
    setQuantity(0.001);
  };

  const currentPrice = prices[symbol];
  const totalValue = currentPrice ? currentPrice * quantity : 0;
  const hasPrices = Object.keys(prices).length > 0;

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Execute Trade</h2>
        {currentPrice && (
          <div className="text-right">
            <div className="text-sm text-gray-400">Current Price</div>
            <div className="text-lg font-semibold text-cyan-400">
              ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 8 })}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Symbol Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Trading Pair
          </label>
          <select
            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200 cursor-pointer"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            disabled={!hasPrices}
          >
            {hasPrices ? (
              availableSymbols.map((sym) => (
                <option key={sym} value={sym}>
                  {sym}
                </option>
              ))
            ) : (
              <option value="">Loading pairs...</option>
            )}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity
          </label>
          <input
            type="number"
            step="0.0001"
            min="0.0001"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(0.0001, parseFloat(e.target.value) || 0.0001))}
            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
            placeholder="Enter quantity"
            disabled={!hasPrices}
          />
        </div>

        {/* Total Value Display */}
        {currentPrice && (
          <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Value:</span>
              <span className="text-lg font-semibold text-white">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        )}

        {/* Trade Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={() => executeTrade("BUY")}
            disabled={isTrading || !currentPrice || !hasPrices}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25 hover:shadow-xl cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow border border-green-400/30 relative overflow-hidden group"
          >
            {/* Animated effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/20 to-green-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {isTrading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Processing...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">BUY</span>
                <span className="text-xs opacity-80 relative z-10">Long</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => executeTrade("SELL")}
            disabled={isTrading || !currentPrice || !hasPrices}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 py-3 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/25 hover:shadow-xl cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow border border-red-400/30 relative overflow-hidden group"
          >
            {/* Animated effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            {isTrading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin relative z-10"></div>
                <span className="relative z-10">Processing...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">SELL</span>
                <span className="text-xs opacity-80 relative z-10">Short</span>
              </>
            )}
          </button>
        </div>

        {/* Quantity Buttons */}
        {hasPrices && (
          <div className="flex gap-3 justify-between">
            {[0.001, 0.01, 0.1, 1].map((qty) => (
              <button
                key={qty}
                type="button"
                onClick={() => setQuantity(qty)}
                className="flex-1 py-2 text-xs bg-gray-700/50 hover:bg-gray-600 rounded-lg transition-colors duration-200 cursor-pointer transform hover:scale-105 active:scale-95"
              >
                {qty}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status Message */}
      {!hasPrices && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
          <div className="flex justify-center items-center mb-2">
            <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2"></div>
            <p className="text-yellow-400 text-sm text-center">
              Connecting to live prices...
            </p>
          </div>
          <p className="text-yellow-500 text-xs text-center">
            Trading will be available once price data is loaded
          </p>
        </div>
      )}
    </div>
  );
};