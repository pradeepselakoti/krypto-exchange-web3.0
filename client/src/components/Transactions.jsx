import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import dummyData from '../utils/dummyData';
import { shortenAddress } from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch';

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifUrl = useFetch({ keyword });
  
  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      w-full
      max-w-full
      flex-col p-3 rounded-md hover:shadow-2xl relative"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-col justify-start w-full mb-6 p-2">
          <a 
            href={`https://sepolia.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm mb-2"
          >
            View on Etherscan
          </a>
          <p className='text-white text-base break-words'>From: {shortenAddress(addressFrom)}</p>
          <p className='text-white text-base break-words'>To: {shortenAddress(addressTo)}</p>
          <p className='text-white text-base'>Amount: {amount} ETH</p>
          {message && <p className='text-white text-sm'>Message: {message}</p>}
          
          <img
            src={gifUrl || url}
            alt="gif"
            className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover my-3"
          />
          
          {keyword && <p className='text-white text-sm'>Keyword: {keyword}</p>}
        </div>
        
        {/* Updated timestamp UI */}
        <div className="bg-gradient-to-r from-blue-600 to-black p-3 px-6 w-max rounded-xl shadow-xl">
          <p className="text-white font-semibold text-sm">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);
  
  // Debug logs - Add these to see what's happening
  console.log('Current Account:', currentAccount);
  console.log('Transactions:', transactions);
  console.log('Transactions length:', transactions?.length);
  
  return (
    <div className='flex w-full max-w-full justify-center items-center 2xl:px-20 gradient-bg-transactions overflow-hidden'>
      <div className='flex flex-col md:p-12 py-12 px-4 w-full max-w-7xl'>
        {currentAccount ? (
          <h3 className='text-white text-3xl text-center my-2'>
            Latest Transaction
          </h3>
        ) : (
          <h3 className='text-white text-3xl text-center my-2'>
            Latest Transaction
          </h3>
        )}
        
        {/* Debug info - Remove this after debugging */}
        <div className="text-white text-center mb-4">
          <p>Current Account: {currentAccount ? 'Connected' : 'Not Connected'}</p>
          <p>Transactions Count: {transactions?.length || 0}</p>
        </div>
        
        <div className='flex flex-wrap justify-center items-center mt-10 w-full'>
          {/* Check if transactions exist and have length */}
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, i) => (
              <TransactionCard key={i} {...transaction} />
            ))
          ) : (
            // Show fallback content when no transactions
            <div className="text-white text-center">
              <p className="text-xl mb-4">No transactions found</p>
              <p className="text-sm opacity-75">
                {!currentAccount ? 'Please connect your wallet to see transactions' : 'No transactions available yet'}
              </p>
              
              {/* Button to manually refresh transactions */}
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Refresh Transactions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;