// src/components/Portfolio.tsx
import React from "react";
import { getWallet } from "../utils/storage";

export const Portfolio: React.FC<{ prices: Record<string, number> }> = ({ prices }) => {
  const wallet = getWallet();
  const portfolioValue = Object.entries(wallet.holdings).reduce(
    (acc, [sym, qty]) => acc + (prices[sym] || 0) * qty,
    0
  );

  const totalEquity = wallet.balance + portfolioValue;
  const profitLoss = portfolioValue;

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Portfolio Overview</h2>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>

      {/* Main Portfolio Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Value Card */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Total Value</h3>
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-blue-400 mb-1">
            ${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400">Current holdings value</p>
        </div>

        {/* Total Equity Card */}
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Total Equity</h3>
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-green-400 mb-1">
            ${totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400">Cash + Investments</p>
        </div>

        {/* P/L Card */}
        <div className={`bg-gradient-to-br ${profitLoss >= 0 ? 'from-green-500/10 to-emerald-500/10 border-green-500/20' : 'from-red-500/10 to-pink-500/10 border-red-500/20'} border rounded-xl p-4 transform hover:scale-[1.02] transition-all duration-300`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Portfolio P/L</h3>
            <svg className={`w-4 h-4 ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {profitLoss >= 0 ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              )}
            </svg>
          </div>
          <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'} mb-1`}>
            {profitLoss >= 0 ? '+' : ''}${profitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-400">Total gains/losses</p>
        </div>
      </div>

      {/* Asset Allocation (if holdings exist) */}
      {Object.keys(wallet.holdings).length > 0 && (
        <div className="border-t border-gray-700/50 pt-4">
          <h3 className="font-semibold text-lg text-gray-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            </svg>
            Asset Allocation
          </h3>
          <div className="space-y-3">
            {Object.entries(wallet.holdings).map(([sym, qty]) => {
              const assetValue = (prices[sym] || 0) * qty;
              const allocationPercentage = portfolioValue > 0 ? (assetValue / portfolioValue) * 100 : 0;
              
              return (
                <div key={sym} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {sym.slice(0, 2)}
                    </div>
                    <div>
                      <span className="font-semibold text-white">{sym}</span>
                      <div className="text-xs text-gray-400">{qty.toFixed(4)} units</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-white">
                      ${assetValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className="text-xs text-gray-400">{allocationPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {Object.keys(wallet.holdings).length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-700/50 rounded-xl">
          <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-400 mb-2">No portfolio assets yet</p>
          <p className="text-gray-500 text-sm">Make your first trade to start building your portfolio</p>
        </div>
      )}
    </div>
  );
};