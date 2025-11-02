// src/components/Wallet.tsx
import React from "react";
import { getWallet } from "../utils/storage";

export const Wallet: React.FC = () => {
  const wallet = getWallet();

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">Wallet</h2>
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
      </div>

      {/* Balance Card - Full Width */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4 mb-6 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 mb-1">Total Balance</p>
            <p className="text-2xl font-bold text-cyan-400">
              ${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Two Column Layout with Equal Height */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[300px]">
        {/* Left Column - Holdings (Full Height) */}
        <div className="bg-gray-800/20 rounded-xl p-5 border border-gray-700/50 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Holdings
            </h3>
            <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-400">
              {Object.keys(wallet.holdings).length} assets
            </span>
          </div>

          <div className="flex-1 flex flex-col">
            {Object.keys(wallet.holdings).length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-700/50 rounded-xl p-8">
                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-gray-400 mb-2 text-center">No holdings yet</p>
                <p className="text-gray-500 text-sm text-center">Start trading to build your portfolio</p>
              </div>
            ) : (
              <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                {Object.entries(wallet.holdings).map(([sym, qty]) => (
                  <div 
                    key={sym} 
                    className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 transform hover:scale-[1.01] group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {sym.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{sym}</span>
                        <div className="text-xs text-gray-400">Crypto Asset</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-white">{qty.toFixed(4)}</span>
                      <div className="text-xs text-gray-400">Quantity</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Stats (Stacked 75% / 25%) */}
        <div className="flex flex-col gap-4 h-full">
          {/* Total Assets Card - 75% height */}
          <div className="flex-1 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300 min-h-[180px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Total Assets
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
              <div className="text-4xl font-bold text-purple-400 mb-3">
                {Object.keys(wallet.holdings).length}
              </div>
              <p className="text-sm text-gray-400 text-center">Different cryptocurrencies in your portfolio</p>
            </div>
          </div>

          {/* Available Balance Card - 25% height */}
          <div className="flex-1 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300 min-h-[100px] max-h-[120px]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-300 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Available
              </h3>
            </div>
            <div className="flex flex-col justify-center h-[calc(100%-2.5rem)]">
              <div className="text-xl font-bold text-green-400 mb-1">
                ${wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-gray-400">Ready to trade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};