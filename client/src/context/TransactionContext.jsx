import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
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

    const handleChange = (e,name)=>{
        setFormData((prevState)=> ({...prevState, [name]: e.target.value}));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('No accounts found')
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
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

            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            // Fixed: Added method property and corrected the request structure
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 in hex (not 210000)
                    value: parsedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );
            
            setIsLoading(true);

            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);

            console.log(`Success - ${transactionHash.hash}`);

            // Get transaction count from contract using the correct method name
            const transactionCount = await transactionContract.getAllTransactionsCount();
            setTransactionCount(transactionCount.toNumber());
            
            // Update localStorage
            localStorage.setItem('transactionCount', transactionCount.toString());

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
            
            // Don't throw error - handle it gracefully
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])
    
    return (
        <TransactionContext.Provider value={{ 
            connectWallet,
            currentAccount, 
            formData, 
            setFormData, 
            handleChange,
            sendTransaction,
            isLoading
        }}>
            {children}
        </TransactionContext.Provider>
    )
}