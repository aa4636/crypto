// src/components/TradeHistory.tsx
import React, { useState } from "react";
import { getTrades } from "../utils/storage";

export const TradeHistory: React.FC = () => {
  const trades = getTrades();
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");

  const filteredTrades = trades.filter(trade => 
    filter === "ALL" || trade.type === filter
  );

  const formatTimestamp = (timestamp: string) => {
    // If it's already in a readable format, return as is
    if (timestamp.includes('PM') || timestamp.includes('AM')) {
      return timestamp;
    }
    // Otherwise, format it properly
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Trade History</h2>
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "ALL" 
              ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25" 
              : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
          }`}
        >
          All Trades
        </button>
        <button
          onClick={() => setFilter("BUY")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "BUY" 
              ? "bg-green-500 text-white shadow-lg shadow-green-500/25" 
              : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
          }`}
        >
          Buys
        </button>
        <button
          onClick={() => setFilter("SELL")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            filter === "SELL" 
              ? "bg-red-500 text-white shadow-lg shadow-red-500/25" 
              : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
          }`}
        >
          Sells
        </button>
      </div>

      {/* Trade History Table */}
      <div className="border border-gray-700/50 rounded-xl overflow-hidden">
        {filteredTrades.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <p className="text-gray-400 mb-2">
              {trades.length === 0 ? "No trades yet" : `No ${filter.toLowerCase()} trades found`}
            </p>
            <p className="text-gray-500 text-sm">
              {trades.length === 0 ? "Start trading to see your history" : "Try changing the filter"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/50 border-b border-gray-700/50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Symbol</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filteredTrades.map((trade, index) => (
                  <tr 
                    key={index} 
                    className="group hover:bg-gray-700/20 transition-all duration-200 transform hover:scale-[1.01]"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          trade.type === "BUY" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}>
                          {trade.symbol.slice(0, 2)}
                        </div>
                        <span className="font-semibold text-white">{trade.symbol}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        trade.type === "BUY" 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        {trade.type === "BUY" ? (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            BUY
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            SELL
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">
                        ${trade.price.toFixed(4)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-300">{trade.quantity}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-white font-semibold">
                        ${(trade.price * trade.quantity).toLocaleString(undefined, { 
                          minimumFractionDigits: 2, 
                          maximumFractionDigits: 2 
                        })}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-gray-400 text-sm">
                        {formatTimestamp(trade.timestamp)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      {filteredTrades.length > 0 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>Showing {filteredTrades.length} of {trades.length} trades</span>
          <span>
            {filter === "ALL" && (
              <>
                <span className="text-green-400">{trades.filter(t => t.type === "BUY").length} buys</span>
                {" • "}
                <span className="text-red-400">{trades.filter(t => t.type === "SELL").length} sells</span>
              </>
            )}
          </span>
        </div>
      )}
    </div>
  );
};