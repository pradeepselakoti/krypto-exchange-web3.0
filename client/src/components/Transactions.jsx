import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import { shortenAddress } from "../utils/shortenAddress";
import { Copy, ExternalLink, Calendar, Eye } from "lucide-react";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
  transactionType, // RECEIVED FROM PARENT
}) => {
  const gifUrl = useFetch({ keyword });
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const statusConfig = {
    Received: {
      color: '#10b981',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: '✓'
    },
    Sent: {
      color: '#ef4444',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: '↗'
    }
  };

  const config = statusConfig[transactionType] || statusConfig["Sent"];
  const usdValue = (parseFloat(amount) * 2435).toFixed(2);

  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const now = new Date();
    const transactionTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - transactionTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-[#1a1d29] m-3 flex flex-1 2xl:min-w-[400px] 2xl:max-w-[450px] sm:min-w-[300px] sm:max-w-[350px] min-w-full max-w-[400px] flex-col rounded-2xl border border-[#2a2d3a] hover:border-[#3a3d4a] transition-all duration-300 hover:shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.borderColor} border`}>
            <span className="text-lg">{config.icon}</span>
            <span className="font-medium text-sm" style={{ color: config.color }}>{transactionType}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{getRelativeTime(timestamp)}</span>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="text-white text-3xl font-bold mb-1">{amount} ETH</div>
        <div className="text-gray-400 text-base">≈ ${usdValue} USD</div>
      </div>

      <div className="px-6 pb-4">
        <div className="text-gray-400 text-sm mb-2">From</div>
        <div className="flex items-center space-x-3">
          <span className="text-[#60a5fa] font-mono text-base">{shortenAddress(addressFrom)}</span>
          <button onClick={() => copyToClipboard(addressFrom, 'from')} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>
          {copied === 'from' && <span className="text-green-400 text-sm">✓ Copied</span>}
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="text-gray-400 text-sm mb-2">To</div>
        <div className="flex items-center space-x-3">
          <span className="text-[#60a5fa] font-mono text-base">{shortenAddress(addressTo)}</span>
          <button onClick={() => copyToClipboard(addressTo, 'to')} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
            <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </a>
          {copied === 'to' && <span className="text-green-400 text-sm">✓ Copied</span>}
        </div>
      </div>

      {message && (
        <div className="px-6 pb-6">
          <div className="text-gray-400 text-sm mb-2">Message</div>
          <div className="text-gray-300 text-base">{message}</div>
        </div>
      )}

      {(gifUrl || url) && (
        <div className="relative">
          <img src={gifUrl || url} alt="Transaction visual" className="w-full h-64 object-cover" />
          <div className="absolute bottom-4 right-4">
            <button className="bg-black/40 backdrop-blur-sm p-3 rounded-full hover:bg-black/60 transition-all duration-200">
              <Eye className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);
  const [activeFilter, setActiveFilter] = useState('All');

  const getFilteredTransactions = () => {
    if (!currentAccount || !transactions.length) return transactions;
    switch (activeFilter) {
      case 'Sent':
        return transactions.filter(tx => tx.addressFrom.toLowerCase() === currentAccount.toLowerCase());
      case 'Received':
        return transactions.filter(tx => tx.addressTo.toLowerCase() === currentAccount.toLowerCase());
      default:
        return transactions;
    }
  };

  const filteredTransactions = getFilteredTransactions();

  const FilterButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/25' : 'bg-[#2a2d3a] text-gray-400 hover:bg-[#3a3d4a] hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions min-h-screen">
      <div className="flex flex-col md:p-12 py-12 px-4 w-full max-w-7xl">
        <h3 className="text-white text-3xl text-center my-2 mb-8">
          {currentAccount ? "Latest Transactions" : "Connect your account to see the latest transactions"}
        </h3>

        {currentAccount && transactions.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-3 bg-[#1a1d29] p-2 rounded-full border border-[#2a2d3a]">
              {['All', 'Sent', 'Received'].map(filter => (
                <FilterButton
                  key={filter}
                  label={filter}
                  isActive={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-start">
          {filteredTransactions.length > 0 ? (
            [...filteredTransactions].reverse().slice(0, 6).map((tx, i) => {
              const type = activeFilter === 'All'
  ? (tx.addressTo.toLowerCase() === currentAccount.toLowerCase() ? 'Received' : 'Sent')
  : activeFilter;

              return <TransactionsCard key={i} {...tx} transactionType={type} />;
            })
          ) : (
            currentAccount && (
              <div className="text-center py-20 w-full">
                <div className="text-gray-400 text-lg">
                  {transactions.length === 0 ? "No transactions found." : `No ${activeFilter.toLowerCase()} transactions found.`}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
