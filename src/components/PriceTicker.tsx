// src/components/PriceTicker.tsx
import React, { useEffect, useState } from "react";

interface Ticker {
  s: string; // symbol
  c: string; // last price
  P: string; // price change percent
}

export const PriceTicker: React.FC<{
  onPriceUpdate: (prices: Record<string, number>) => void;
}> = ({ onPriceUpdate }) => {
  const [tickers, setTickers] = useState<Record<string, { price: number; changePercent: number }>>({});
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data: Ticker[] = JSON.parse(event.data);
      const updated: Record<string, { price: number; changePercent: number }> = {};
      const priceUpdate: Record<string, number> = {};

      data.slice(0, 15).forEach((t) => {
        updated[t.s] = {
          price: parseFloat(t.c),
          changePercent: parseFloat(t.P)
        };
        priceUpdate[t.s] = parseFloat(t.c);
      });

      setPrevPrices(Object.fromEntries(
        Object.entries(tickers).map(([symbol, data]) => [symbol, data.price])
      ));
      setTickers(updated);
      onPriceUpdate(priceUpdate);
    };

    ws.onerror = () => {
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => ws.close();
  }, [onPriceUpdate, tickers]);

  const getPriceColor = (current: number, previous: number | undefined, changePercent: number) => {
    if (previous === undefined) return "text-gray-300";
    if (current > previous) return "text-green-400";
    if (current < previous) return "text-red-400";
    return "text-gray-300";
  };

  const getBackgroundColor = (current: number, previous: number | undefined) => {
    if (previous === undefined) return "";
    if (current > previous) return "bg-green-500/10 border-green-500/20";
    if (current < previous) return "bg-red-500/10 border-red-500/20";
    return "bg-gray-800/30 border-gray-700/50";
  };

  const getChangeIcon = (current: number, previous: number | undefined) => {
    if (previous === undefined) return "→";
    if (current > previous) return "↗";
    if (current < previous) return "↘";
    return "→";
  };

  return (
    <div className="glass-card rounded-xl p-6 mb-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold gradient-text">Live Prices</h2>
          <div className={`flex items-center gap-1 text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          {Object.keys(tickers).length} pairs
        </div>
      </div>

      {/* Ticker Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(tickers).map(([symbol, data]) => {
          const prev = prevPrices[symbol];
          const color = getPriceColor(data.price, prev, data.changePercent);
          const bgColor = getBackgroundColor(data.price, prev);
          const changeIcon = getChangeIcon(data.price, prev);

          return (
            <div
              key={symbol}
              className={`border rounded-xl p-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${bgColor} group cursor-pointer`}
            >
              {/* Symbol and Change Indicator */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {symbol}
                </span>
                <span className={`text-lg font-bold ${color}`}>
                  {changeIcon}
                </span>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-white mb-1">
                {data.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: data.price < 1 ? 6 : 4 
                })}
              </div>

              {/* Change Percentage */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  data.changePercent >= 0 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
                </span>
                
                {/* Price Flash Animation */}
                {prev !== undefined && data.price !== prev && (
                  <div className={`w-2 h-2 rounded-full animate-ping ${
                    data.price > prev ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                )}
              </div>

              {/* Subtle price change indicator */}
              {prev !== undefined && data.price !== prev && (
                <div className={`text-xs mt-2 ${
                  data.price > prev ? 'text-green-400' : 'text-red-400'
                }`}>
                  {data.price > prev ? '↑' : '↓'} from {prev.toFixed(4)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loading/Empty State */}
      {Object.keys(tickers).length === 0 && (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 mb-2">Connecting to live prices...</p>
          <p className="text-gray-500 text-sm">Fetching real-time market data</p>
        </div>
      )}

      {/* Connection Status Footer */}
      <div className="mt-4 pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-500">
        <span>Data provided by Binance WebSocket</span>
        <span>Updated in real-time</span>
      </div>
    </div>
  );
};