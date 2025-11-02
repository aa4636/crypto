// src/utils/tradeStorage.ts
export interface Trade {
  symbol: string;
  type: "BUY" | "SELL";
  price: number;
  quantity: number;
  timestamp: string;
}

export interface Wallet {
  balance: number;
  holdings: Record<string, number>;
}

const STORAGE_KEYS = {
  TRADES: 'crypto_trades',
  WALLET: 'crypto_wallet'
};

// Initialize wallet with default balance if none exists
export const getWallet = (): Wallet => {
  const stored = localStorage.getItem(STORAGE_KEYS.WALLET);
  if (!stored) {
    const defaultWallet: Wallet = {
      balance: 1000000000, // starting balance in USDT
      holdings: {},
    };
    localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(defaultWallet));
    return defaultWallet;
  }
  return JSON.parse(stored);
};

// Get all trades from localStorage
export const getTrades = (): Trade[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.TRADES);
  return stored ? JSON.parse(stored) : [];
};

// Save wallet to localStorage
const saveWallet = (wallet: Wallet) => {
  localStorage.setItem(STORAGE_KEYS.WALLET, JSON.stringify(wallet));
};

// Save trades to localStorage
const saveTrades = (trades: Trade[]) => {
  localStorage.setItem(STORAGE_KEYS.TRADES, JSON.stringify(trades));
};

export const addTrade = (trade: Trade) => {
  const trades = getTrades();
  const wallet = getWallet();
  
  trades.unshift(trade); // Add to beginning for latest first
  const totalCost = trade.price * trade.quantity;

  if (trade.type === "BUY") {
    wallet.balance -= totalCost;
    wallet.holdings[trade.symbol] =
      (wallet.holdings[trade.symbol] || 0) + trade.quantity;
  } else if (trade.type === "SELL") {
    wallet.balance += totalCost;
    wallet.holdings[trade.symbol] =
      (wallet.holdings[trade.symbol] || 0) - trade.quantity;
    if (wallet.holdings[trade.symbol] <= 0) delete wallet.holdings[trade.symbol];
  }

  // Save both to localStorage
  saveTrades(trades);
  saveWallet(wallet);
};