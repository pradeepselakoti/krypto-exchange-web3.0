import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log("Structured transactions:", structuredTransactions);
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log("Error getting transactions:", error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        
        // Debug: Log available contract functions
        try {
          const contract = createEthereumContract();
          console.log("Contract functions available:", Object.keys(contract.functions || {}));
          console.log("Contract interface:", contract.interface.fragments.map(f => f.name));
        } catch (e) {
          console.log("Error checking contract functions:", e);
        }
        
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        
        // Check if the function exists before calling it
        if (typeof transactionsContract.getTransactionCount === 'function') {
          const currentTransactionCount = await transactionsContract.getTransactionCount();
          window.localStorage.setItem("transactionCount", currentTransactionCount);
        } else {
          console.log("getTransactionCount function not found in contract");
          // Try alternative function names
          if (typeof transactionsContract.getTransactionCounter === 'function') {
            const currentTransactionCount = await transactionsContract.getTransactionCounter();
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          } else if (typeof transactionsContract.transactionCount === 'function') {
            const currentTransactionCount = await transactionsContract.transactionCount();
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        }
      }
    } catch (error) {
      console.log("Error checking transaction count:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask.");
        return;
      }

      const { addressTo, amount, keyword, message } = formData;
      
      // Enhanced validation
      if (!addressTo || !amount) {
        alert("Please fill in address and amount fields.");
        return;
      }

      if (!ethers.utils.isAddress(addressTo)) {
        alert("Please enter a valid Ethereum address.");
        return;
      }

      if (isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      console.log("Starting transaction...");
      console.log("Form data:", formData);
      
      setIsLoading(true);

      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      console.log("Parsed amount:", parsedAmount.toString());

      // Check balance first
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(currentAccount);
      console.log("Current balance:", ethers.utils.formatEther(balance));

      if (balance.lt(parsedAmount)) {
        throw new Error("Insufficient funds for transaction.");
      }

      // Get gas price and estimate gas
      const gasPrice = await provider.getGasPrice();
      console.log("Gas price:", gasPrice.toString());

      // Send the ETH transaction first
      console.log("Sending ETH transaction...");
      const ethTx = await ethereum.request({
        method: "eth_sendTransaction",
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: "0x5208", // 21000 gas
          value: parsedAmount._hex,
        }],
      });

      console.log("ETH transaction sent:", ethTx);

      // Now add to blockchain contract
      console.log("Adding to blockchain contract...");
      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo, 
        parsedAmount, 
        message || "", 
        keyword || ""
      );

      console.log(`Contract transaction hash: ${transactionHash.hash}`);
      
      // Wait for transaction to be mined
      console.log("Waiting for transaction to be mined...");
      const receipt = await transactionHash.wait();
      console.log("Transaction mined:", receipt);
      
      // Update transaction count
      try {
        if (typeof transactionsContract.getTransactionCount === 'function') {
          const transactionsCount = await transactionsContract.getTransactionCount();
          setTransactionCount(transactionsCount.toNumber());
        } else if (typeof transactionsContract.getTransactionCounter === 'function') {
          const transactionsCount = await transactionsContract.getTransactionCounter();
          setTransactionCount(transactionsCount.toNumber());
        } else if (typeof transactionsContract.transactionCount === 'function') {
          const transactionsCount = await transactionsContract.transactionCount();
          setTransactionCount(transactionsCount.toNumber());
        }
      } catch (countError) {
        console.log("Error updating transaction count:", countError);
      }

      // Clear form
      setformData({ addressTo: "", amount: "", keyword: "", message: "" });
      
      setIsLoading(false);
      
      alert("Transaction successful!");
      
      // Reload after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error) {
      console.error("Transaction error:", error);
      setIsLoading(false);
      
      // More specific error handling
      if (error.message.includes("insufficient funds")) {
        alert("Insufficient funds for transaction + gas fees.");
      } else if (error.message.includes("rejected") || error.message.includes("denied")) {
        alert("Transaction was rejected by user.");
      } else if (error.message.includes("gas")) {
        alert("Transaction failed due to gas issues. Try increasing gas limit.");
      } else if (error.message.includes("nonce")) {
        alert("Nonce error. Please reset your MetaMask account or try again.");
      } else if (error.message.includes("network")) {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert(`Transaction failed: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};