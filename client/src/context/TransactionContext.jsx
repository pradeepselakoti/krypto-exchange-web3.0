import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

// Fixed: Use consistent function name
const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo:'',amount:'',keyword:'',message:''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'))
    const [transactions, setTransactions] = useState([])

    const handleChange = (e,name)=>{
        setFormData((prevState)=> ({...prevState, [name]: e.target.value}));
    }

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();

                console.log('Fetching transactions from contract...');
                const availableTransactions = await transactionsContract.getAllTransactions();
                
                console.log('Raw transactions from contract:', availableTransactions);

                const structuredTransactions = availableTransactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                console.log('Structured Transactions:', structuredTransactions);
                console.log('Number of transactions:', structuredTransactions.length);
                
                // Sort by timestamp to show most recent first
                const sortedTransactions = structuredTransactions.sort((a, b) => 
                    new Date(b.timestamp) - new Date(a.timestamp)
                );
                
                setTransactions(sortedTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log('Error getting transactions:', error);
            console.log('Error details:', error.message);
        }
    };

    // Fixed: Removed duplicate function and kept the correct one
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            console.log('Accounts:', accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // Fixed: Call getAllTransactions when wallet is connected
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log('Error checking wallet connection:', error);
        }
    };

    const checkIfTransactionsExists = async () => {
        try {
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log('Error checking transactions:', error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            // Fixed: Call getAllTransactions after connecting wallet
            getAllTransactions();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                alert("Please install metamask");
                return; 
            }

            const {addressTo, amount, keyword, message} = formData;
            
            if (!addressTo || !amount || !keyword || !message) {
                alert("Please fill in all fields");
                return;
            }

            setIsLoading(true);

            // Fixed: Use consistent function name
            const transactionContract = createEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );
            
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);

            console.log(`Success - ${transactionHash.hash}`);

            // Get transaction count from contract
            const transactionCount = await transactionContract.getAllTransactionsCount();
            setTransactionCount(transactionCount.toNumber());
            
            localStorage.setItem('transactionCount', transactionCount.toString());

            // Fixed: Refresh transactions after successful transaction
            getAllTransactions();

            // Reset form after successful transaction
            setFormData({addressTo:'',amount:'',keyword:'',message:''});

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            
            if (error.message.includes("User rejected")) {
                alert("Transaction was rejected by user");
            } else if (error.message.includes("insufficient funds")) {
                alert("Insufficient funds for transaction");
            } else {
                alert("Transaction failed. Please try again.");
            }
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
        
        // Also fetch transactions on component mount
        if (ethereum) {
            getAllTransactions();
        }
    }, [])
    
    // Add effect to refetch transactions when currentAccount changes
    useEffect(() => {
        if (currentAccount && ethereum) {
            getAllTransactions();
        }
    }, [currentAccount])
    
    return (
        <TransactionContext.Provider value={{ 
            connectWallet,
            currentAccount, 
            formData, 
            setFormData, 
            handleChange,
            sendTransaction,
            transactions,
            isLoading,
            getAllTransactions // Added this for manual refresh if needed
        }}>
            {children}
        </TransactionContext.Provider>
    )
}